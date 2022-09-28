import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import * as utils from '../components/utilities/utilities.js'

import ConfirmReservation from '../components/confirmReservation'



class confirmReservationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: {
                id:0,
                reservationDu:null,
                reservationAu:null,
                montantReservation:null,
                stade:'',
                emplacement:'',
                centre:'',
                adresse:'',
                ville:'',
                cp:''
            },
            isOk: false,
            displayMessage:'',            
        }

    }

    componentDidMount() {
        console.log('confirm res')
        let _reservationParams = utils.getCookie("reservationParams");
        console.log(_reservationParams); 
        let _user = utils.getCookie("user");        
        if (_reservationParams && _user) {
            let jsonData_reservationParams = JSON.parse(_reservationParams);
            let jsonData_user = JSON.parse(_user);

            let _formattedJourReservation = new Date(jsonData_reservationParams.jour).toLocaleDateString();


            let _this = this;
            var bodyFormData = new FormData();
            bodyFormData.append('stadeId', jsonData_reservationParams.stadeId);
            bodyFormData.append('jour', _formattedJourReservation);
            bodyFormData.append('heure', jsonData_reservationParams.heure);
            bodyFormData.append('duree', jsonData_reservationParams.duree);
            bodyFormData.append('email', jsonData_user.email);
            axios({
                method: "post",
                url: "http://localhost:8080/API_REST/front/reserverStade",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    
                    let _data = JSON.parse(response.data);
                    utils.eraseCookie("reservationParams");
                    _this.setState({ isOk: _data.isOk });  
                    _this.setState({ displayMessage: _data.message });  
                    console.log(_data.reservationData);                                 
                    if (_data.isOk) {
                        _this.setState({ reservation: _data.reservationData });
                    }                                      
                })
                .catch(function (response) {
                    //handle error
                    _this.setState({ isOk: false });
                    _this.setState({ displayMessage: response });                                   
                });
        }
    }

    render() {
        return (
            <>
                <header className="mb-auto">
                    <Navigation  />
                </header>
                <main className="px-3">
                    <ConfirmReservation  isOk={this.state.isOk} 
                    displayMessage={this.state.displayMessage} 
                    reservationDu ={this.state.reservation.reservationDu}
                    reservationAu ={this.state.reservation.reservationAu}
                    montantReservation ={this.state.reservation.montantReservation}
                    stade ={this.state.reservation.stade}
                    emplacement ={this.state.reservation.emplacement}
                    centre ={this.state.reservation.centre}
                    adresse ={this.state.reservation.adresse}
                    ville ={this.state.reservation.ville}
                    cp ={this.state.reservation.cp}
                    />
                </main>
                <Footer></Footer>
            </>
        );
    }

}


export default confirmReservationPage;