import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import Subscribe from '../components/Subscribe'




const SubscribePage = (Props) => {

        return (
            <>
                <header className="mb-auto">
                    <Navigation  />
                </header>
                <main className="px-3">
                    <Subscribe  />
                </main>
                <Footer></Footer>
            </>
        );
    
}


export default SubscribePage;