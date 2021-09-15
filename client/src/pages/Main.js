import Auth from '../utils/auth'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_SELF } from '../utils/queries'
import Header from '../components/Header';
import Footer from '../components/Footer';
import View from '../components/Views/index'
// import {Redirect} from 'react-router-dom'


export default function Main() {
    // // USER DATA FOR USE IN UNDERLYING COMPONENTS
    // const [userData, setUserData] = useState({});
    // const { data } = useQuery(QUERY_SELF, {
    //     onCompleted: () => {
    //         setUserData(data.Self)
    //     }
    // });
    // console.dir(userData)
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
        <View page={page}
        // userData={userData}
        /> 
        <Footer page={page}
        setPage={setPage}
        handleChange={handleChange}
        /> 
    </div>
    )
}