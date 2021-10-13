import React from 'react'
import WelcomeCard from "./components/WelcomeCard"
import { localSavedViceIDs,getSavedViceIDs } from '../../utils/localStorage'
// import {useEffect} from 'react'

function Home({userData}) {   
    // let dbItemIDs = getSavedViceIDs()
    console.dir(userData)
//     console.table(dbItemIDs)
// const {items} = userData
// if (items){
//     items.map((item) => {
//     // let newItemID = item.vice_id
// if (!dbItemIDs.includes(item.vice_id)){
//     console.log(item.vice_id)
//         dbItemIDs.push(item.vice_id)
// }
//     console.log('Line 18:',dbItemIDs)
//     return dbItemIDs
// })
// localSavedViceIDs(dbItemIDs)}






    return (
    <div className="renderHome">
        <h2 className="pageTitle">Welcome {userData.username},</h2>
         <WelcomeCard />
        
    </div>)
}
export default Home
