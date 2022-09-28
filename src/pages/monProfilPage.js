import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import MonProfil from '../components/MonProfil'




const monProfil = (Props) => {

        return (
            <>
                <header className="mb-auto">
                    <Navigation  />
                </header>
                <main className="px-3">
                    <MonProfil  />
                </main>
                <Footer></Footer>
            </>
        );
    
}


export default monProfil;