import React, { Component } from 'react';
import { Row, Col, Alert, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import * as utils from '../components/utilities/utilities.js'




class confirmReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        
    }


    render() {
        return (
            <Row className="justify-content-md-center">
                <Col>

                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faCheck} /> Réservation confirmée</h1>
                        <hr />

                        <Alert variant={this.props.isOk ? 'success' : 'danger'}>
                            {this.props.displayMessage}
                        </Alert>
                        <Card>
                            <Card.Body className="text-dark">
                                <h5><FontAwesomeIcon icon={faMapMarkerAlt} /> {this.props.centre} : {this.props.adresse}, {this.props.ville} ({this.props.cp})</h5>
                                Vous avez réservé le stade {this.props.stade}
                                &nbsp;situé au {this.props.emplacement}
                                &nbsp;pour la période du {this.props.reservationDu} au {this.props.reservationAu}.
                            </Card.Body>
                        </Card>






                    </div>
                </Col>
            </Row>
        );
    }

}


export default confirmReservation;