import React, { Component } from 'react';
import  Form from 'react-bootstrap/Form';
import { Button, Container } from "react-bootstrap";
import "./Register.css";
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';

export interface IRegisterProps {
    username: string;
    email: string;
    password: string;   
}

class Register extends Component {
    state = {
        username: null,
        email: null,
        password: null,
        redirect: false,
    }

    handleChange = (e: { target: { id: any; value: any; }; }) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(this.state);
        const { username, email, password } = this.state;
        console.log(username);
        console.log(email);
        console.log(password);
        console.log("HERE");

        fetch('http://localhost:4000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        })
        .then(res => res.json())
        .then((data) => console.log(data))
        .then(() => this.setState({ redirect: true }))
        
        .catch((() => alert("This email adress is already being used. Try different one"))
        )
    }
  
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/vacations'/>;
    }
    return (
        
        <Container className = "register-form -center">
            <h2>Register</h2>
            <br/>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <input required type="text" id="username" onChange={this.handleChange} placeholder="User name" />
                </Form.Group>

                <Form.Group controlId="Email">
                    <input required type="email" id="email" onChange={this.handleChange} placeholder="Enter email" /> 
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <input required type="password" id="password" onChange={this.handleChange} placeholder="Password"/>   
                </Form.Group>
                <br/>
                <Button variant="outline-danger" type="submit">
                    Join us
                </Button>
                <br/>
                <br/>
                <Form.Text className="text-muted">
                    Already on The Last Vacation? <Link to="/Login" >Log in</Link>
                </Form.Text>
            </Form>
           
            
        </Container>
            );
        }
    }
    export default Register