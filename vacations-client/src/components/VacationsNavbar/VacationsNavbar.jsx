import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

class VacationsNavbar extends Component {
    render() {
        const { logedInUserName, administrator, SignSignout } = this.props;
        console.log(logedInUserName, administrator);
        return (
           
            <Navbar variant="dark" expand="lg">
            <Navbar.Brand href="#/"> Hi {logedInUserName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 {administrator &&
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <Nav.Link><Link to="/AdminVacationsList" >AdminVacationsList</Link></Nav.Link>
                    <Nav.Link><Link to="/AddVacation" >Add Vacation</Link></Nav.Link>
                    <Nav.Link><Link to="/AdminStatistics" >Admin statistics</Link></Nav.Link>

                </Nav>
            </Navbar.Collapse>
              }
  
            <Nav.Link><Link to="/" onClick = {SignSignout} >Signout</Link></Nav.Link>
                
            </Navbar>

        );
    }
}

export default VacationsNavbar;