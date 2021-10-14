import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { localSavedViceIDs } from '../../utils/localStorage'
import { QUERY_SELF, QUERY_USER_ITEMS } from '../../utils/queries'
import Add from './Add'
import Search from './Search'
import Home from './Home'
import Library from './Library'

export default function View(page) {
    // let lsViceIDs = []
    const [userData, setUserData] = useState({});
    const [userItems, setUserItems] = useState([]);

    const { data } = useQuery(QUERY_SELF, {
        onCompleted: () => {
            setUserData(data.Self)
        }
    })
    const itemData  = useQuery(QUERY_USER_ITEMS,{
        onCompleted: () => {
            let dbItems = itemData.data.UserItems.items;
            let viceIDs =[]
            dbItems.forEach(item => {return viceIDs.push(item.vice_id)})
            setUserItems(viceIDs)
            return userItems;
        }
    })
  
    localSavedViceIDs(userItems)

    // let itemIDList = [] 
    // userItems.map(item => [...itemIDList, item.vice_id])
        
        // const {items} = userData;
        // if (items){
        // items.forEach((item) => {lsViceIDs.push(item.vice_id)})
        // localSavedViceIDs(userItems)
        // }

    let view = page.page;
    // Get State from Footer through Main and render appropriate component  
    if (view === "home") {
        return <Home userData = { userData }
        /> ;
    }
    if (view === "library") {
        return <Library userData = { userData }
        /> ;
    }
    if (view === "search") {
        return <Search userData = { userData }
        /> ;
    }
    if (view === "add") {
        return <Add userData = { userData }
        /> ;
    }



}