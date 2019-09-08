import React, { Component } from 'react';
import  Form from 'react-bootstrap/Form';
import { Button, Container } from "react-bootstrap";
import "./Login.css";
import {Link} from 'react-router-dom';

class Login extends Component{
    state = {
        username: '',
        password: '',
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

   

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle Submit :", e);
        const { onLoginSuccess, bringFavorites } = this.props;
        const { username, password } = this.state;
        console.log("username, password", username, password)

        await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(res => res.json())
        .then((data) => {
            this.setState ({
                logedInUserDetails: data});
           onLoginSuccess(data);
        })


        .catch((() => alert("The user name or password is incorrect. Try again"))
        )
    }
  
  render() {
    
   
    return (
        <Container className="login-form">
            <h2>Log in</h2>
            <br/>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <input required type="text"  id="username" onChange={this.handleChange} placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <input required type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                </Form.Group>
                
                <br/>
                <Button variant="outline-danger" type="submit">
                    Enter
                </Button>
                <br/>
                <br/>
                <Form.Text className="text-muted">
                    Need an account? <Link to="/Register" >Register</Link>
                </Form.Text>
                
            </Form>
        </Container>
            );
        }
    };

export default Login