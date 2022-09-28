import React from 'react';
import Footer from '../components/Footer';
import Navigation from "../components/Navigation";
import Login from '../components/Login'




const LoginPage = () => {

        return (
            <>
            <header className="mb-auto">
          <Navigation />
      </header>
      <main className="px-3">
            <Login />
            </main>
            <Footer></Footer>
            </>
        );
    
}


export default LoginPage;