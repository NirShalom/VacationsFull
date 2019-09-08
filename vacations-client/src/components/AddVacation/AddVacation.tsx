import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container } from "react-bootstrap";


export interface IAddVacationProps {
    Title: string;
    Description: string;
    Price: number;
    BGImage: string;
}

class AddVacation extends Component <IAddVacationProps>{
    
    state = {
        title: null,
        description: null,
        price: null,
        BGImage: null
    }

    handleChange = (e: { target: { id: any; value: any; }; }) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async (e: { preventDefault: () => void; }) => {
        
        e.preventDefault();
        let newVacation = this.state
        console.log("newVacation", newVacation);
        
        const { title, description, price, BGImage } = this.state;

        const response = await fetch('http://localhost:4000/vacations/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: title,
                description: description,
                price: price,
                BGImage: BGImage,
            })
            
        })
        
        if (response.status === 200) {
            alert ("A new vacation has been added")
          
        } else {
            alert('Vacation was not added!');
        }
        
    }

    render() {
        return (
            <Container className = "register-form -center">
                <h2>Add new vacation</h2>
                <Form onSubmit={this.handleSubmit} id="add-vacation-form">
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

export default AddVacation