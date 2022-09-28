import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import MesReservations from '../components/MesReservations'




const mesReservationPage = (Props) => {

        return (
            <>
                <header className="mb-auto">
                    <Navigation  />
                </header>
                <main className="px-3">
                    <MesReservations  />
                </main>
                <Footer></Footer>
            </>
        );
    
}


export default mesReservationPage;