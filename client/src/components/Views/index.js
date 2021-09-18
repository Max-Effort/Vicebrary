import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { QUERY_SELF } from '../../utils/queries'
import Add from './Add'
import Search from './Search'
import Home from './Home'
import Library from './Library'

export default function View(page) {
    const [userData, setUserData] = useState({});
    
    const { data } = useQuery(QUERY_SELF, {
        onCompleted: () => {
            setUserData(data.Self)
        }
    });
    
    console.dir('User:',{userData})
    let view = page.page;
    // Get State from Footer through Main and render appropriate component  
    if (view === "home") {
        return <Home userData={userData}/> ;
    }
    if (view === "library") {
        return <Library userData={userData}/> ;
    }
    if (view === "search") {
        return <Search userData={userData}/> ;
    }
    if (view === "add") {
        return <Add userData={userData}/> ;
    }




}