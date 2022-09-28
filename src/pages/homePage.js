import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import { NavLink } from 'react-router-dom';


const HomePage = () => {      
    return (               
        <>
         <header className="mb-auto">
          <Navigation />
      </header>
      <main className="px-3">
            <h1>Cover your page.</h1>
            <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
            <p className="lead">            
            <NavLink to="/reservation" className="btn btn-lg btn-success fw-bold">Je reserve mon stade</NavLink>
            </p>
        
            </main> 

            <Footer></Footer>
        </>
          
    );
};

export default HomePage;