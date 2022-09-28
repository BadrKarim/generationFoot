import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";



const NotFoundPage = () => {
   
    return (
        <>    
        <header className="mb-auto">
          <Navigation />
      </header>  
      <main className="px-3">
          <h1>Erreur 404</h1>
          </main>   
          <Footer></Footer>
        </>
    );
};

export default NotFoundPage;