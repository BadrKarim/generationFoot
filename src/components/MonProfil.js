import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, ButtonGroup, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser, faAt,  faCheck } from '@fortawesome/free-solid-svg-icons'


import * as utils from './utilities/utilities.js'



class MonProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            isValidUserName: true,
            isValidForm: true,
            displayAlert: false,
            displayMessage: 'Votre nom a bien été modifié',
            alertVariant: 'success',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        let _isValidUserName = this.state.userName.length > 0;
        this.setState({ isValidUserName: _isValidUserName });



        let _isValidForm = _isValidUserName;
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
            bodyFormData.append('username', this.state.userName);


            axios({
                method: "post",
                url: "http://localhost:8080/API_REST/front/updateProfil",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    let _data = response.data;                                        
                    _this.setState({ userName: _data.userName });
                    _this.setState({ alertVariant: 'success' });
                    _this.setState({ displayAlert: true });


                })
                .catch(function (response) {
                    console.log(response);                    
                    _this.setState({ displayAlert: true });
                    _this.setState({ alertVariant: 'danger' });
                    _this.setState({ displayMessage: response });
                });
        }
    };
    componentDidMount() {
        let _user = utils.getCookie("user");
        if (_user) {
            let _userData = JSON.parse(_user);
            axios.get(`http://localhost:8080/API_REST/front/getProfil/` + _userData.email)
                .then(reponse => {
                    var _data = reponse.data;
                    this.setState({ email: _data.email });
                    this.setState({ userName: _data.username });
                });
        }

    };
    render() {
        return (
            <Row className="justify-content-md-center">
                <Col xs={12} sm={10} md={8} lg={6}>

                    <div className="text-white p-3 userContainer">

                        <h1><FontAwesomeIcon icon={faUser} /> Mon profil</h1>
                        <Form.Label><FontAwesomeIcon icon={faAt} /> {this.state.email}</Form.Label><br />
                        <hr />
                        {this.state.displayAlert &&
                            <Alert variant={this.state.alertVariant}>
                                {this.state.displayMessage}
                            </Alert>
                        }

                        <Form method="post" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3 pb-3">
                                <Form.Label><FontAwesomeIcon icon={faUser} /> Nom</Form.Label>
                                <Form.Control type="text" value={this.state.userName} placeholder="votre nom" onChange={(e) => this.setState({ userName: e.target.value })} />
                                {!this.state.isValidUserName &&
                                    <div className="text-danger">
                                        Veuillez fournir un nom.
                                    </div>
                                }
                            </Form.Group>



                            <hr />

                            <Form.Group style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="success" style={{ marginLeft: "auto" }}>Je valide <FontAwesomeIcon icon={faCheck} /></Button>
                            </Form.Group>

                        </Form>


                    </div>
                </Col>
            </Row>
        );
    }

}


export default MonProfil;