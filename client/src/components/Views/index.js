import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks'
// import { localSavedViceIDs,getSavedViceIDs } from '../../utils/localStorage'
import { QUERY_SELF } from '../../utils/queries'
import Add from './Add'
import Search from './Search'
import Home from './Home'
import Library from './Library'

export default function View(page) {
    // let lsViceIDs = []
    const [userData, setUserData] = useState({});
    // const [userItems, setUserItems] = useState(getSavedViceIDs());
    
    const { data } = useQuery(QUERY_SELF, {
        onCompleted: () => {
            setUserData(data.Self)
            // setUserItems(lsViceIDs)
        }
    })
    // const {items} = userData;
    // if (items){
    // items.forEach((item) => {lsViceIDs.push(item.vice_id)})
    // localSavedViceIDs(userItems)
    // }

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