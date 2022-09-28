import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faCalendarAlt, faCheck, faMapPin, faVideo, faRunning, faMapMarkerAlt, faEdit, faClock, faStopwatch, faEuroSign } from '@fortawesome/free-solid-svg-icons'

import stadiumImgJpg from "../assets/images/stadium.jpg"
import { Redirect } from 'react-router'
import * as utils from './utilities/utilities.js'


class StadiumList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            centreId: 0,
            jour: new Date(),
            heure:'',
            duree:0,
            typeTerrainId: 0,
            listStades: [],
            selectedStadeId: 0,
            redirect: false
        }

        this.onModifierRechercheClick = this.onModifierRechercheClick.bind(this);
        this.handleSelectStade = this.handleSelectStade.bind(this);
    }




    onModifierRechercheClick(e) {
        this.props.onchangeEtape(1, this.props.centreId, this.props.centre, this.props.jour, this.props.heure, this.props.duree, this.props.typeTerrainId, this.props.typeTerrain, this.props.centre);
    }

    handleSelectStade(e) {        
        this.setState({ selectedStadeId: e.target.value });
        let _reservationParams={
            stadeId:e.target.value,
            jour : this.props.jour,
            heure : this.props.heure,
            duree : this.props.duree
        }
        
        utils.eraseCookie("reservationParams");   
        utils.setCookie("reservationParams",JSON.stringify( _reservationParams), 7);         
        this.setState({ redirect: true })  ;
    }
    componentDidMount() {

        let _this = this;
        var bodyFormData = new FormData();
        bodyFormData.append('centreId', this.props.centreId);
        bodyFormData.append('jour', this.props.jour.toLocaleDateString());
        bodyFormData.append('heure', this.props.heure);
        bodyFormData.append('duree', this.props.duree);
        bodyFormData.append('typeTerrainId', this.props.typeTerrainId);
        axios({
            method: "post",
            url: "http://localhost:8080/API_REST/front/rechercheStadesPourReservation",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response.data);
                _this.setState({ listStades: response.data });

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {            
            return <Redirect to='/confirmReservation' />;
        }

        return (
            <Row className="justify-content-md-center">
                <Col xs={12}>

                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faFutbol} /> Stades disponibles</h1>
                        <div className="d-flex justify-content-start">
                            <Col className="">
                                <span>
                                    <FontAwesomeIcon icon={faCalendarAlt} /> {this.props.jour.toLocaleDateString()}
                                </span>
                                <span className="px-2 d-xs-block">
                                    <FontAwesomeIcon icon={faClock} /> {this.props.heure}
                                </span>
                                <span className="px-2 d-xs-block">
                                    <FontAwesomeIcon icon={faStopwatch} /> { utils.timeConvert(this.props.duree)}
                                </span>
                                
                                <span className="px-2 d-xs-block">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {this.props.centre}
                                </span>

                                <span className="px-2 d-xs-block">
                                    <FontAwesomeIcon icon={faRunning} /> {this.props.typeTerrain}
                                </span>
                            </Col>
                            <Col lg={2}>
                                <button className="btn btn-warning btn-sm" onClick={this.onModifierRechercheClick}>
                                    <span className="d-none d-lg-inline">
                                        Modifier
                                        &nbsp;
                                    </span>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </Col>
                        </div>
                        <hr />

                        <Row xs={1} sm={2} md={3} className="g-4 stadiumList">
                            {this.state.listStades.map((stade, id) => (
                                <Col key={id}>
                                    <Card>
                                        <Card.Img variant="top" src={stadiumImgJpg} />
                                        <Card.Body>
                                            <Card.Title className="text-dark">
                                                <div>
                                                    {stade.nom}
                                                </div>
                                                <div className="pt-1 small text-dark stadiumOptions">
                                                    <span className=""><FontAwesomeIcon icon={faMapPin} className="text-primary" /> {stade.emplacement}</span>
                                                    <br />
                                                    <span className={"pr-2 " + (stade.avecCamera === '1' ? 'text-success' : 'text-danger nocamera')}><FontAwesomeIcon icon={faVideo} className="text-primary" /> {stade.avecCamera ? 'Avec caméra' : 'Sans caméra'}</span>
                                                    <br />
                                                    <span className="pr-2"><FontAwesomeIcon icon={faRunning} className="text-primary" /> {stade.type}</span>
                                                    <br />
                                                    <span className="pr-2"><FontAwesomeIcon icon={faEuroSign} className="text-primary" /> {parseFloat(stade.tarif).toFixed(2)}</span>
                                                </div>
                                            </Card.Title>
                                            <Card.Text className="text-black">
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                            <Button variant="success" onClick={this.handleSelectStade} value={stade.stadeId}>Reserver <FontAwesomeIcon icon={faCheck} /></Button>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>


                    </div>
                </Col>
            </Row>
        );

    }
}


export default StadiumList;