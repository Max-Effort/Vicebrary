import Auth from '../utils/auth'
import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import View from '../components/Views/index'



export default function Main() {
      const [page, setPage] = useState('home');

    const handleChange = (event, newPage) => {
        console.log({ newPage });
        setPage(newPage);
    };
    if (Auth.loggedIn() === false) {
        window.location.replace('/login');
    }
    return ( 
    <div className="mainPage" >
        <Header />
        <View page={page}/> 
        <Footer page={page}
        setPage={setPage}
        handleChange={handleChange}
        /> 
    </div>
    )
}