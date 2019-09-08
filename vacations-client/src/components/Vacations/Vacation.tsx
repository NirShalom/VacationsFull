import * as React from 'react';
import './VacationCard.css';
import { Card, CardImg, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

export interface IVacationProps {
    id: number;
    Title: string;
    description: string;
    price: number;
    BGImage: string;
    favorites : any[];
    onToggleFavorite(id: number): void;
}

export class Vacation extends React.Component<IVacationProps> {
    onToggleFavorite = () => {
        const { onToggleFavorite, id } = this.props;
        onToggleFavorite(id);
    };

    render() {
        const { id, Title, description, price, BGImage, favorites } = this.props;
        console.log("Yes favorites", id, favorites)
        
        return (
            <Card className='m-2 bg-Black' style={{ width: '16rem' }}>
                <CardImg variant="top"  className='mw-100' src={BGImage} style={{ width: '100%', height: '200px'}} />
                            
                <Card.Body >
                    <Card.Title>{Title}</Card.Title>
                    <Card.Text> {description} </Card.Text>
                    <Card.Text className="text-muted"> ${price} / per night </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent">
                    {console.log("favorites loop for button",favorites)}
                    
                    { 
                        (favorites!=undefined && !favorites.includes(id)) ? (

                                <Button variant="danger" type="submit" onClick={() => this.onToggleFavorite()} > Add to favorites </Button>

                        ) : (
                            <div>
                                <FontAwesomeIcon icon={faSkull} />
                                <Button variant="outline-danger" type="submit" onClick={() => this.onToggleFavorite()} > Remove from favorites </Button>
                            </div>
                        
                        )
                    } 
                        
                </Card.Footer>   
            </Card>
        )
    };
}