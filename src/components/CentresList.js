import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faCheck, faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import stadiumImgJpg from "../assets/images/stadium.jpg"
import { NavLink } from 'react-router-dom';



class CentresList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            centres: []
        }
    }





    componentDidMount() {
        axios.get(`http://localhost:8080/API_REST/front/getDBCentes`)
            .then(reponse => {

                var _data = reponse.data;
                console.log(_data);
                this.setState({ centres: _data });
            });

    };

    render() {
        return (
            <Row className="justify-content-md-center">
                <Col xs={12}>

                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faFutbol} /> Nos centres</h1>
                        <hr />

                        <Row xs={1} sm={2} className="g-4 stadiumList">
                            {this.state.centres.map((centre, id) => (
                                <Col key={id}>
                                    <Card>
                                        <Card.Img variant="top" src={stadiumImgJpg} />
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem><b>{centre.nom}</b></ListGroupItem>
                                            <ListGroupItem><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />&nbsp;
                                                {centre.adresse}, {centre.ville} ({centre.code_postale})</ListGroupItem>
                                            <ListGroupItem>
                                                <FontAwesomeIcon icon={faEnvelope} className="text-primary" /> {centre.email}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <FontAwesomeIcon icon={faPhone} className="text-primary" /> {centre.telephone}
                                            </ListGroupItem>
                                        </ListGroup>
                                        <Card.Body>

                                            <Card.Text className="text-black">
                                                <h5>Horaires d'ouverture</h5>
                                                <div class="container">
                                                    <div class="row lf-row-default no-gutters">
                                                        <div class="col-5">Lundi</div> <div class=" text-center col-3">10:00</div>
                                                        <div class="text-center col-1">-</div>
                                                        <div class=" text-center col-3">2:00</div>
                                                    </div><div class="row lf-row-default no-gutters"><div class="col-5">Mardi</div>
                                                        <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div>
                                                        <div class=" text-center col-3">2:00</div>  </div><div class="row lf-row-default no-gutters"><div class="col-5">Mercredi</div> <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div> <div class=" text-center col-3">2:00</div>  </div><div class="row lf-row-default no-gutters"><div class="col-5">Jeudi</div> <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div> <div class=" text-center col-3">2:00</div>  </div><div class="row lf-row-default no-gutters"><div class="col-5">Vendredi</div> <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div> <div class=" text-center col-3">2:00</div>  </div><div class="row lf-row-default no-gutters"><div class="col-5">Samedi</div> <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div> <div class=" text-center col-3">2:00</div>  </div><div class="row lf-row-default no-gutters"><div class="col-5">Dimanche</div> <div class=" text-center col-3">10:00</div> <div class="text-center col-1">-</div> <div class=" text-center col-3">2:00</div></div></div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            
                        </Row>
                        <div className="text-center pt-3">
                                <NavLink to="/reservation" className="btn btn-success">Je reserve dans ce centre <FontAwesomeIcon icon={faCheck} /></NavLink>
                            </div>

                    </div>
                </Col>
            </Row>
        );

    }
}


export default CentresList;