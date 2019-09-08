import React, { Component } from 'react';
import  Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import "./WelcomeScreen.css";
import {Link} from 'react-router-dom';
import BackgroungImage from '../eye.gif';


class WelcomeScreen extends Component {
  
    render() {
              
      return (
          
          <div className = "welcomeScreen">
            <img className ="background-gif" src={BackgroungImage} alt="BackgroungImage"/> 
            <div className ="hero-text">
              
              <h3>The last</h3>
                <h1> VACATION </h1>
                <p>From hell-themed amusement parks to islands covered with snakes, 
                  these are some of the scariest places on Earth—visit them if you dare</p>
                
                <Form>
                  <Button className = "btn-1" variant="outline-dark" >
                      <Link to="/Register" className = "btn-text" >Register</Link>
                  </Button>
                  <Button className = "btn-1" variant="outline-dark">
                    <Link to="/Login" className = "btn-text" >Log in</Link>
                  </Button>
                </Form>
              </div>
          </div>
              );
          }
      }
    export default WelcomeScreen