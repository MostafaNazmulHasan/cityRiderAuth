import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardDetails = (props) => {
    const { image, name, id } = props.cardData;
    const imageStyle = {
        height: '100%',
        width: '100%',
        padding: '10%',
        marginLeft: '5px'
    }
    return (
        <div className='col-md-3 text-center'>
            <div className='mainCard'>
                <Link className="showCardLink" to={`destination/${name}`}>
                    <Card style={{ width: '18rem', marginTop: '70%' }} key={id}>
                        <Card.Img style={imageStyle} variant="top" src={image} />
                        <Card.Body>
                            <Card.Title style={{textDecoration: 'None'}}>{name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default CardDetails;