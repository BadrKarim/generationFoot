import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from './pages/homePage';
import centresPage from './pages/centresPage';
import ReservationPage from './pages/reservationPage';
import LoginPage from './pages/loginPage';
import SubscribePage from './pages/subscribePage';
import NotfoundPage from './pages/notfoundPage';
import confirmReservationPage from './pages/confirmReservationPage';
import monProfilPage from './pages/monProfilPage';
import MesReservationPage from './pages/mesReservationPage';
import * as utils from  './components/utilities/utilities.js'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reservation/:idCentre?" component={ReservationPage} />
            <Route exact path="/noscentres" component={centresPage} />
            <Route exact path="/connexion" component={LoginPage} />
            <Route exact path="/inscription" component={SubscribePage} />
            <Route exact path="/confirmReservation" render={() => (
              utils.getCookie("user") !== null ? (<Route component={confirmReservationPage} />)
                : (<Route component={LoginPage} />)
            )} />
            <Route exact path="/monProfil" render={() => (
              utils.getCookie("user") !== null ? (<Route component={monProfilPage} />)
                : (<Route component={LoginPage} />)
            )} />
            <Route exact path="/mesReservations" render={() => (
              utils.getCookie("user") !== null ? (<Route component={MesReservationPage} />)
                : (<Route component={LoginPage} />)
            )} />

            <Route component={NotfoundPage} />
          </Switch>
        </BrowserRouter>




      </>
    );
  }
}

export default App;
