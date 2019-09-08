import React from "react";
import { Container, Row } from "react-bootstrap";
import { Vacation } from "./Vacation";

class VacationCardList extends React.Component<any, any> {
  render() {
    const { onToggleFavorite, favorites, vacations } = this.props;
    let vacationsWithoutFavorites = vacations.filter(function(vacation: any) {
      return favorites == undefined?true:!favorites.includes (vacation.id)
    });
    
    console.log("vacations", vacations);
    console.log("favorites", favorites);
    console.log("vacationsWithoutFavorites", vacationsWithoutFavorites);
        
    return (
      <Container>
        {favorites!=undefined && !!favorites.length && 
          <div>
            <h4 className="display-4 text-center" style={{ color: 'red' }}>Favorites</h4>
            <Row className="justify-content-sm-center">
            
              {favorites.map((favoriteId: any) => {
                const vacation = vacations.find((vacation: any) => {
                  return vacation.id === favoriteId
                })

                return (
                  <Vacation
                    {...vacation}
                    key={vacation.id}
                    onToggleFavorite={() => {
                      onToggleFavorite(vacation.id);
                    }}
                  />
                )
              })}

            </Row>
          </div>}
          
          <div>
            <h4 className="display-4 text-center" style={{ color: 'red' }}>All vacations</h4>
            <Row className="justify-content-sm-center ">
              
              {vacationsWithoutFavorites.map((vacation: any) => (
                <Vacation
                  {...vacation}
                  key={vacation.id}
                  onToggleFavorite={() => {
                    onToggleFavorite(vacation.id);
                  }}
                  favorites={favorites}
                />
              ))}
              
            </Row>
        </div>
      </Container>
    );
  }
}
export default VacationCardList;
