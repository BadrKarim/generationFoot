import React, { Component } from 'react';

import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import RechercheStades from '../components/RechercheStades'
import StadiumList from '../components/StadiumList';




class ReservationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centreId: 0,
            centre: '',
            jour: new Date(),
            heure:'',
            duree:0,
            typeTerrainId: 0,
            tyeTerrain: '',
            etape: 1
        }
    }

    onchangeEtape(_etape, _centreId, _centre, _jour, _heure, _duree, _typeTerrainId, _typeTerrain) {             
        this.setState({ etape: _etape });
        this.setState({ centreId: _centreId });
        this.setState({ centre: _centre });
        this.setState({ jour: _jour });
        this.setState({ heure: _heure });
        this.setState({ duree: _duree });
        this.setState({ typeTerrainId: _typeTerrainId });
        this.setState({ typeTerrain: _typeTerrain });             
    }    

    render() {
        return (
            <>
                <header className="mb-auto">
                    <Navigation />
                </header>
                <main className="px-3">
                    {this.state.etape === 1 &&
                        <RechercheStades
                            onchangeEtape={(_etape, _centreId, _centre,  _jour, _heure, _duree, _typeTerrainId, _typeTerrain) => { this.onchangeEtape(_etape, _centreId, _centre,  _jour, _heure, _duree, _typeTerrainId, _typeTerrain) }} />
                    }
                    {this.state.etape === 2 &&
                        <StadiumList 
                            centreId={this.state.centreId}
                            centre={this.state.centre}
                            jour={this.state.jour}
                            heure={this.state.heure}
                            duree={this.state.duree}
                            typeTerrainId={this.state.typeTerrainId}
                            typeTerrain={this.state.typeTerrain} 
                            onchangeEtape={(_etape, _centreId, _centre, _jour, _heure, _duree, _typeTerrainId, _typeTerrain) => { this.onchangeEtape(_etape, _centreId, _centre, _jour, _heure, _duree, _typeTerrainId, _typeTerrain) }} />
                    }

                </main>
                <Footer></Footer>
            </>
        );
    }

}


export default ReservationPage;