import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, ButtonGroup, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser, faAt, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'
import * as utils from  './utilities/utilities.js'




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userName: '',
            isLogged: false,
            isValidEmail: true,
            isValidPassword: true,
            isValidForm: true,
            displayAlert: false,
            displayMessage: '',
            alertVariant: 'success',
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateForm() {
        let _isValidEmail = false;
        if (this.state.email.length > 0) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(this.state.email)) {
                _isValidEmail = true;
            }
        }



        this.setState({ isValidEmail: _isValidEmail });

        let _isValidPassword = this.state.password.length > 0;
        this.setState({ isValidPassword: _isValidPassword });

        let _isValidForm = _isValidEmail && _isValidPassword;
        this.setState({ isValidForm: _isValidForm });

        return _isValidForm;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ displayAlert: false });
        let _isValidForm = this.validateForm();

        if (_isValidForm) {
            let _this = this;
            var bodyFormData = new FormData();
            bodyFormData.append('email', this.state.email);
            bodyFormData.append('password', this.state.password);


            axios({
                method: "post",
                url: "http://localhost:8080/API_REST/front/login",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {                    
                    let _data = JSON.parse(response.data);
                    if (_data.isOk) {
                        _this.setState({ isLogged: true });
                        _this.setState({ email: _data.userData.email });
                        _this.setState({ userName: _data.userData.username });
                        _this.setState({ alertVariant: 'success' });

                        //mettre en cache le user authentifié puis rediriger vers la page confirm reservation sinon home                        
                        utils.setCookie("user",JSON.stringify(_data.userData), 30);                        
                        _this.setState({ redirect: true });                        

                    } else {
                        _this.setState({ isLogged: false });
                        _this.setState({ displayAlert: true });
                        _this.setState({ alertVariant: 'danger' });
                        _this.setState({ displayMessage: _data.message });

                    }

                })
                .catch(function (response) {                    
                    //handle error
                    _this.setState({ isLogged: false });
                    _this.setState({ displayAlert: true });
                    _this.setState({ alertVariant: 'danger' });
                    _this.setState({ displayMessage: response });
                });
        }
    }
    render() {
        const { redirect } = this.state;        
        if (redirect) {
            let _reservationParams = utils.getCookie("reservationParams");
            console.log(document.cookie.split(';'));                                              
            if (_reservationParams) {                
                return <Redirect to='/confirmReservation' />;
            } else {
                return <Redirect to='/' />;
            }

        }
        return (
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={8} lg={6}>

                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faUser} /> Mon compte</h1>
                        <hr />
                        {this.state.displayAlert &&
                            <Alert variant={this.state.alertVariant}>
                                {this.state.displayMessage}
                            </Alert>
                        }
                        <Form method="post" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faAt} /> Email</Form.Label>
                                <Form.Control type="text" value={this.state.email} placeholder="votre email" onChange={(e) => this.setState({ email: e.target.value })} />
                                {!this.state.isValidEmail &&
                                    <div className="text-danger">
                                        Veuillez fournir une adresse email valide.
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FontAwesomeIcon icon={faKey} /> Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.password} placeholder="votre mot de passe" onChange={(e) => this.setState({ password: e.target.value })} />
                                {!this.state.isValidPassword &&
                                    <div className="text-danger">
                                        Veuillez fournir un mot de passe.
                                    </div>
                                }
                            </Form.Group>
                            <hr />
                            <ButtonGroup style={{ display: "flex" }}>
                                <NavLink className="btn btn-danger" to="/inscription">Inscription <FontAwesomeIcon icon={faUserPlus} /></NavLink>
                                <Button type="submit" variant="success" style={{ marginLeft: "auto" }}>Je me connecte <FontAwesomeIcon icon={faCheck} /></Button>
                            </ButtonGroup>
                        </Form>


                    </div>
                </Col>
            </Row>
        );
    }

}


export default Login;