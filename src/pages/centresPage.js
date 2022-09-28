import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import CentresList from '../components/CentresList';



const CentresPage = () => {
   
    return (
        <>    
        <header className="mb-auto">
          <Navigation />
      </header>  
      <main className="px-3">
          <CentresList />
          </main>   
          <Footer></Footer>
        </>
    );
};

export default CentresPage;