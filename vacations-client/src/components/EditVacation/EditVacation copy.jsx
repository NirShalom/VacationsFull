import React, { Component } from 'react';
import  Form from 'react-bootstrap/Form';
import { Button, Container } from "react-bootstrap";


class EditVacation extends Component {
    state = {
        id: null,
        Title: null,
        description: null,
        price: null,
        BGImage: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const { id, Title, description, price, BGImage } = this.state;

        fetch('http://localhost:4000/vacations/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                Title: Title,
                description: description,
                price: price,
                BGImage: BGImage,
            })
        })
        .then(res => res.json())
        .then((data) => console.log(data))
        
        .catch((() => alert("Somthing went wrong. Please try again"))
        )
    }
  
  render() {
    const { redirect } = this.state;

    return (
        
        <Container className = "register-form -center">
                    <h2>Edit vacation</h2>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                            <input required type="text" id="title" onChange={this.handleChange} placeholder="Title" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <input required type="text" id="description" onChange={this.handleChange} placeholder="Description" />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <input required type="number" id="price" onChange={this.handleChange} placeholder="price" />
                        </Form.Group>
                        <Form.Group controlId="BGImage">
                            <input required type="text" id="BGImage" onChange={this.handleChange} placeholder="Image link" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
               
                </Container>
            );
        }
    }
    export default EditVacation