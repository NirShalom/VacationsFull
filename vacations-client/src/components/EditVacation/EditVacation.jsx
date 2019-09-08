import React, { Component } from 'react';
import  Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export class EditVacation extends Component {
    constructor (props){
        super(props);
    }
    
    state = {
        id: this.props.id,
        Title: this.props.Title,
        description: this.props.description,
        price: this.props.price,
        BGImage: this.props.BGImage
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render () {
        const {id, Title, description, price, BGImage } = this.state;
        
        
    return (
        <Form>
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Vacation
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <Form>
                        <Form.Group controlId="Title">
                            <input 
                                required 
                                type="text" 
                                id="Title" 
                                onChange={e => this.setState({ Title: e.target.value })} 
                                placeholder= {Title}  
                                value={Title} 
                            />
                                    
                        </Form.Group>
                        <Form.Group controlId="description">
                            <input 
                                required 
                                type="text" 
                                id="description" 
                                onChange={e => this.setState({ description: e.target.value })}
                                placeholder={description}
                                value={description} 
                            />

                        </Form.Group>
                        <Form.Group controlId="price">
                            <input 
                            required 
                            type="number" 
                            id="price" 
                            onChange= {e => this.setState({ price: e.target.value })}
                            placeholder={price}
                            value={price}      
                            />
                        </Form.Group>
                        <Form.Group controlId="BGImage">
                            <input 
                                required 
                                type="text" 
                                id="BGImage" 
                                onChange={e => this.setState({ BGImage: e.target.value })}
                                placeholder={BGImage} 
                                value={BGImage} 
                            />
                        </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick = {this.editVacationDetails}
                    >Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}

editVacationDetails = async () => {
        
        const { id, onEdit } = this.props;
        const { Title, description, price, BGImage} = this.state;

        this.props.onHide();
        await fetch(`http://localhost:4000/vacations/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                Title: Title,
                description: description,
                price: price,
                BGImage: BGImage,
            })
        });
        console.log("edit completed");
        let updatedVacation = this.state;
        console.log("updatedVacation", updatedVacation);
        onEdit(updatedVacation);
    }
}

export default EditVacation