import React, { Component } from 'react';
import { DatePicker } from "react-rainbow-components";
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faMapMarkerAlt, faCalendarAlt, faRunning, faCheck, faClock, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment';



class RechercheStades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initReservation:
            {
                listeDesCentres: [],
                typesTerrains: []
            },
            centreId: 0,
            centre: '',
            jour: new Date(),
            heure: '9:30',
            duree: 60,
            typeTerrainId: 0,
            typeTerrain: 'Tous terrains',
            isValidCentre: true,
            isValidCreneau: true,
            isValidForm: true

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEtape() {
        this.props.onchangeEtape(this.state.etape);
    }

    handleCentreChange(e) {
        this.setState({ centreId: e.target.value });
        let _isValidCentre = e.target.value !== 0;
        this.setState({ isValidCentre: _isValidCentre });
        this.setState({ centre: e.target.options[e.target.selectedIndex].text });
    }

    handleHeureChange(e) {
        this.setState({ heure: e.target.value });
    }
    handleDureeChange(e) {
        this.setState({ duree: e.target.value });
    }

    handleTypeTerrainChange(e) {
        this.setState({ typeTerrainId: e.target.value });
        this.setState({ typeTerrain: e.target.options[e.target.selectedIndex].text });
    }

    validateForm() {
        let _isValidCentre = this.state.centreId !== 0;
        this.setState({ isValidCentre: _isValidCentre });

        let _isValidCreneau = this.state.jour != null;
        this.setState({ isValidCreneau: _isValidCreneau });

        let _isValidForm = _isValidCentre && _isValidCreneau;
        this.setState({ isValidForm: _isValidForm });
    }
    handleSubmit(e) {
        e.preventDefault();
        let _isValidForm = this.state.centreId !== 0 && this.state.creaneau !== null;
        this.validateForm();
        console.log(Moment(this.state.creaneau).format('Y-M-D HH:mm:ss'));

        if (_isValidForm) {
            this.props.onchangeEtape(2, this.state.centreId, this.state.centre, this.state.jour, this.state.heure, this.state.duree, this.state.typeTerrainId, this.state.typeTerrain, this.state.centre);
        } else
            return;

        //alert('Le nom a été soumis : ' + _isValid);        

    }
    componentDidMount() {                
        axios.get(`http://localhost:8080/API_REST/front/getDBInitReservation`)
            .then(reponse => {

                var data = JSON.parse(reponse.data);
                let _initReservation = { ...this.state.initReservation }
                _initReservation.listeDesCentres = data.listeDesCentres;
                _initReservation.typesTerrains = data.typesTerrains;
                this.setState({ initReservation: _initReservation });
                console.log(this.state.initReservation);

            });
    };

    render() {
        return (

            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faFutbol} /> Réservation</h1>
                        <hr />

                        <Form method="post" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Séléctionnez votre centre</Form.Label>
                                <Form.Select onChange={(e) => this.handleCentreChange(e)} value={this.state.centreId}>
                                    <option value="0">Tous les centres</option>
                                    {this.state.initReservation.listeDesCentres.map((centre) => <option key={centre.id} value={centre.id}>{centre.nom}</option>)}
                                </Form.Select>
                                {!this.state.isValidCentre &&
                                    <div className="text-danger">
                                        Veuillez choisir votre centre préféré.
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faCalendarAlt} /> Quel jour ?</Form.Label>
                                <DatePicker
                                    id="datetimepicker-1"
                                    value={this.state.jour}
                                    minDate={new Date()}
                                    formatStyle="large"
                                    locale="fr-FR"
                                    okLabel="Valider"
                                    cancelLabel="Annuler"
                                    onChange={value => this.setState({ jour: value })}
                                />
                                {!this.state.isValidCreneau &&
                                    <div className="text-danger">
                                        Veuillez choisir un creneau horaire.
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faClock} /> Quelle heure</Form.Label>
                                <Form.Select onChange={(e) => this.handleHeureChange(e)} defaultValue={this.state.heure}>
                                    <option value="09:30">
                                        09:30
                                    </option><option value="10:00">
                                        10:00
                                    </option><option value="10:30">
                                        10:30
                                    </option><option value="11:00">
                                        11:00
                                    </option><option value="11:30">
                                        11:30
                                    </option><option value="12:00">
                                        12:00
                                    </option><option value="12:30">
                                        12:30
                                    </option><option value="13:00">
                                        13:00
                                    </option><option value="13:30">
                                        13:30
                                    </option><option value="14:00">
                                        14:00
                                    </option><option value="14:30">
                                        14:30
                                    </option><option value="15:00">
                                        15:00
                                    </option><option value="15:30">
                                        15:30
                                    </option><option value="16:00">
                                        16:00
                                    </option><option value="16:30">
                                        16:30
                                    </option><option value="17:00">
                                        17:00
                                    </option><option value="17:30">
                                        17:30
                                    </option><option value="18:00">
                                        18:00
                                    </option><option value="18:30">
                                        18:30
                                    </option><option value="19:00">
                                        19:00
                                    </option><option value="19:30">
                                        19:30
                                    </option><option value="20:00">
                                        20:00
                                    </option><option value="20:30">
                                        20:30
                                    </option><option value="21:00">
                                        21:00
                                    </option><option value="21:30">
                                        21:30
                                    </option><option value="22:00">
                                        22:00
                                    </option><option value="22:30">
                                        22:30
                                    </option><option value="23:00">
                                        23:00
                                    </option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faStopwatch} /> Durée</Form.Label>
                                <Form.Select onChange={(e) => this.handleDureeChange(e)} defaultValue={this.state.duree}>
                                    <option value="60">1H</option>
                                    <option value="90">1H30</option>
                                    <option value="120">2H</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faRunning} /> Type de stade</Form.Label>
                                <Form.Select onChange={(e) => this.handleTypeTerrainChange(e)}>
                                    <option value="0">{this.state.typeTerrain}</option>
                                    {this.state.initReservation.typesTerrains.map((tt) => <option key={tt.id} value={tt.id}>{tt.libelle}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <hr />
                            <Form.Group style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" className="btn btn-success">Je cherche mon stade <FontAwesomeIcon icon={faCheck} /></button>

                            </Form.Group>
                        </Form>


                    </div>
                </Col>
            </Row>
        );
    }

}


export default RechercheStades;