import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faCheck, faMapMarkerAlt, faEnvelope, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'

import stadiumImgJpg from "../assets/images/stadium.jpg"
import { NavLink } from 'react-router-dom';
import * as utils from './utilities/utilities.js'



class MesReservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            email: ''
        }

        this.onAnnulerReservationClick = this.onAnnulerReservationClick.bind(this);
    }

    onAnnulerReservationClick(e) {        
        if (window.confirm('Êtes vous sûr de vouloir annuler cette réservation ?')) {
            let _this = this;
            var bodyFormData = new FormData();
            bodyFormData.append('email', this.state.email);
            bodyFormData.append('idReservation', e.target.value);
            axios({
                method: "post",
                url: "http://localhost:8080/API_REST/front/annulerReservation",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    let _data = response.data;
                    _this.setState({ reservations: _data });
                })
                .catch(function (response) {
                    console.log(response);                    
                });
        }
    }



    componentDidMount() {
        let _user = utils.getCookie("user");
        if (_user) {
            let _userData = JSON.parse(_user);
            this.state.email = _userData.email;
            axios.get(`http://localhost:8080/API_REST/front/getReservations/` + _userData.email)
                .then(reponse => {

                    var _data = reponse.data;
                    this.setState({ reservations: _data });
                });
        }

    };

    render() {
        return (
            <Row className="justify-content-md-center">
                <Col xs={12}>

                    <div className="text-white p-3 userContainer listReservation">

                        <h1><FontAwesomeIcon icon={faFutbol} /> Mes réservations</h1>
                        <hr />

                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Centre</th>
                                    <th>Début reservation</th>
                                    <th>Fin réservation</th>
                                    <th>Annulation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reservations.map((res, idx) => (
                                    <tr key={idx}>
                                        <td>{res.centre}</td>
                                        <td>{res.reservationDu}</td>
                                        <td>{res.reservationAu}</td>
                                        <td className="text-center">
                                            {res.estAnnulable == 1 &&
                                                <Button variant="danger" title="Annuler la réservation" value={res.id} onClick={this.onAnnulerReservationClick}><FontAwesomeIcon icon={faTrash} /></Button>
                                            }
                                            {res.estAnnulable == 0 &&
                                                <span>-</span>
                                            }
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>



                        

                    </div>
                </Col>
            </Row>
        );

    }
}


export default MesReservations;