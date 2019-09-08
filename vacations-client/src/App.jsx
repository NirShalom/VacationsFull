import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AdminVacationsList from "./components/Editor/AdminVacationsList";
import VacationCardList from "./components/Vacations/VacationCardList";
import VacationsNavbar from "./components/VacationsNavbar/VacationsNavbar";
import Login from "./components/Login/Login";

import Register from "./components/Register/Register";
import AddVacation from "./components/AddVacation/AddVacation";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import AdminStatistics from "./components/AdminStatistics/AdminStatistics";
import { Redirect } from 'react-router';
import EditVacation from "./components/EditVacation/EditVacation";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vacations: [],
      favorites: [],
      isLoading: true,
      logedInUserDetails:{},
    };
  }

  onToggleFavorite = (id) => {
    const userID = this.state.logedInUserDetails.id
    const vacationSN = id;
    const { favorites } = this.state;
   
    if (this.state.favorites!=undefined && this.state.favorites.includes(vacationSN)) {

        const response = fetch(`http://localhost:4000/favorites/delete/${userID}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            clientID: userID,
            vacationSN: vacationSN,
          })

        });
        if (response.status === 200) {
           console.log("deleted:", vacationSN, userID );
           
        } else {
            console.error('not deleted!', vacationSN, userID);
        }
        
          const favoritesAfterDelete = favorites.filter(favorites => favorites !== vacationSN)
          console.log("favoritesAfterDelete", favoritesAfterDelete)
          this.setState({
            favorites: favoritesAfterDelete
          });

       // -------------------
    } else {

      console.log("this.state.favorites",this.state.favorites);
      console.log("from checkbox:", userID, vacationSN );
          fetch('http://localhost:4000/favorites/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
              clientID: userID,
              vacationSN: vacationSN,

            })
        })
        if(this.state.favorites==undefined)
        {
          this.state.favorites = [];
        }
        this.state.favorites.push(id);
        this.setState({favorites: this.state.favorites});
        console.log("from click:", userID, id );
       
    }
  };
 
  delete = async () => {
    const { id, onDelete } = this.props;
    const response = await fetch(`http://localhost:4000/favorites/${id}`, {
        method: 'DELETE'
    });
    if (response.status === 200) {
        onDelete(id);
    } else {
        console.error('not deleted!');
    }
  }
  
  SignSignout = () => {
    this.setState ({
        logedInUserDetails:{
          id: '',
          username: '',
          password: '',
          email: '',
          isLogin: false,
          isadmin: false,
        }
  })
    // this.setState({
    //   favorites: response
    // })
  }

  async componentDidMount() {

    let { vacations } = this.state;

    try {
      const response = await fetch("http://localhost:4000/vacations");
      vacations = await response.json();
      console.log("app vacations:", vacations);

      this.setState({
        vacations,
        isLoading: false
      });

    } finally {
      this.setState({
        vacations,
        isLoading: false
      });
    }
  }

  onLoginSuccess = (userData) => {
    const userFavorites = this.userFavorites;
    this.setState ({
        logedInUserDetails:{
          id: userData.id,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          isLogin: true,
          isadmin: userData.isadmin === 1 ? true : false,
        }
  })
  userFavorites(userData.id).then(response => 
    this.setState({
      favorites: response
    })
  )}

   //____Get Favorites_______________________________________ 

  userFavorites = (clientID) => {
    return fetch(`http://localhost:4000/favorites/users/${clientID}`,{
      method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
    })  
    .then(res=> res.json())
    .then((data) => {
      console.log('Success: ', data);
      let userFavorites = data.map(a => a.vacationsn);
      console.log('Success: ', userFavorites);
      return userFavorites;
    })
    .catch((() => console.log("FUUUUUUUUUCCCCCCCCCKKKKKKKKKKK")))
  }


// ------------Add Vacation ----------------

addVacationToState = (newVacation) => {
  let VacationsList = [...this.state.vacations];
  let newVacationsList = VacationsList.push(newVacation);
  console.log('VacationsList', VacationsList);
  console.log('newVacationsList',newVacationsList);

this.setState({ vacations: newVacationsList }, ()=>{
  console.log(this.state.vacations);
});
}

  render() {
    const { vacations, favorites, isLoading, logedInUserDetails} = this.state;
    console.log("App favorites:", favorites);
    console.log("App vacations:", vacations);
    console.log("App logedInUserDetails:", logedInUserDetails);

    if (isLoading) {
      return <div> Loading </div>;
    }

    if (logedInUserDetails.isLogin) {
      if (logedInUserDetails.isadmin){
        return (

          <Router>
            <Redirect to='/AdminVacationsList'/>
            <VacationsNavbar 
              logedInUserName={logedInUserDetails.username}
              administrator={logedInUserDetails.isadmin}
              SignSignout = {this.SignSignout}
              />
            <Switch>
              <Route path="/AdminVacationsList/" component={AdminVacationsList} />
              <Route path="/AdminStatistics/" component={(props) => (
                  <AdminStatistics
                  getAdminStats={this.getAdminStats}/>
                )}
              />
              <Route path="/AddVacation/" component={AddVacation} 
              addVacationToState = {this.addVacationToState}
              />
              <Route path="/EditVacation/" component={EditVacation} />
            </Switch>
            <Footer/>
          </Router>
        );

      } else {
        return (
          <Router>
            <Redirect to='/vacations'/>
            <VacationsNavbar 
              logedInUserName={logedInUserDetails.username}
              administrator={logedInUserDetails.isadmin}
              SignSignout = {this.SignSignout}
            />
            <Route path="/vacations" render={(props) => (
              <VacationCardList
                onToggleFavorite={this.onToggleFavorite}
                favorites={favorites}
                vacations={vacations}
              />)}
            />
            <Footer />
          </Router>
        );
      } 
    };

    return (
      <Router>
        <Redirect to='/'/>
          <Route path="/" exact component={WelcomeScreen} />
          <Route 
            exact
            path={"/Login"} 
            component={() => (
              <Login onLoginSuccess={this.onLoginSuccess} bringFavorites={this.bringFavorites}/>
            )}
          />     
          <Route path="/Register" exact component={Register} />
      </Router>
    );
  }
}

export default App;


