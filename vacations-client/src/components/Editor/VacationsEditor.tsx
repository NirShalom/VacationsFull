import * as React from 'react';
import { Button, Card, CardImg } from "react-bootstrap";
import  { EditVacation } from '../EditVacation/EditVacation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


export interface IEditorProps {
    id: number;
    Title: string;
    description: string;
    price: number;
    BGImage: string;
    onDelete(id: number): void;
    onEdit(updatedVacation: any): void;
}

export class VacationsEditor extends React.Component<IEditorProps> {

    state: any = {
        modalShow: false 
    };
    
    public render() {
        const { id, Title, description, price, BGImage } = this.props;
        let modalClose: any = () => this.setState({modalShow: false})
        return (
                <Card className='m-2 bg-Black' style={{ width: '16rem' }}>
                    <CardImg variant="top"  className='mw-100' src={BGImage} style={{ width: '100%', height: '200px'}} />  
                    <Card.Body >
                    <Card.Title>{id} </Card.Title>
                        <Card.Title>{Title}</Card.Title>
                            <Card.Text> {description} </Card.Text>
                            <Card.Text> ${price} / per night </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                        <Button onClick={this.delete} variant="outline-dark" >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button onClick={this.edit} >
                        <FontAwesomeIcon icon={faEdit} />
                        edit
                        </Button>
                        <EditVacation 
                            show={this.state.modalShow}
                            onHide={modalClose}
                            id= {this.props.id}
                            Title= {this.props.Title}
                            description = {this.props.description}
                            price = {this.props.price}
                            BGImage= {this.props.BGImage}
                            onEdit={this.props.onEdit}
                        />
                    </Card.Footer>
                        
                </Card>
        )
    };

    delete = async () => {
        const { id, onDelete } = this.props;
        const response = await fetch(`http://localhost:4000/vacations/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 200) {
            onDelete(id);
        } else {
            console.error('not deleted!');
        }
    }
    
    edit = () => {
        const { id, Title, description, price, BGImage, onEdit } = this.props;
        console.log(id, Title, description, price, BGImage);
        console.log("onEdit", onEdit);
        this.setState({modalShow: true});
        
    }
        

}