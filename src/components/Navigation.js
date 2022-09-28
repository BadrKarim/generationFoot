import React, { Component } from 'react';
import { Nav, Dropdown } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import * as utils from './utilities/utilities.js'

import { Redirect } from 'react-router'
import { browserHistory } from 'react-router';



class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: utils.getCookie("user") !== null,
      pathname: '',
      redirect: false
    }

    this.onLogOut = this.onLogOut.bind(this);
  }
  
  onLogOut(e) {    
    this.setState({ pathname: window.location.pathname });
    utils.eraseCookie("user");     
    utils.eraseCookie("reservationParams");        
    this.setState({ redirect: true });

  }
  
  render() {
    const { redirect } = this.state;

    if (redirect) {         
      return <Redirect to={this.state.pathname} />
    }
    return (
      <div className="navigation">
        <h3 className="float-md-start mb-0">
          <NavLink to="/"><img src="/images/GF_Logo.PNG" alt="Génération Foot" /></NavLink>
        </h3>

        <Nav className="nav nav-masthead justify-content-center float-md-end">
          <NavLink className="nav-link" to="/reservation" activeClassName="active">Réservation</NavLink>
          <NavLink className="nav-link" to="/noscentres" activeClassName="active">Nos centres</NavLink>
          {!this.state.authenticated &&
            <NavLink className="nav-link" to="/connexion" activeClassName="active">Mon compte</NavLink>
          }
          {this.state.authenticated &&

            <Dropdown className="ms-2">
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/monProfil">Mon profil</Dropdown.Item>
                <Dropdown.Item as={Link} to="/mesReservations">Mes réservation</Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.onLogOut}>Deconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </Nav>
      </div>
    );
  }
};

export default Navigation;