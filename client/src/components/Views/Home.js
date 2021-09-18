import React from 'react'
import WelcomeCard from "./components/WelcomeCard"

function Home({userData}) {   
    console.dir(userData)
    return (
    <div className="renderHome">
        <h2>Welcome {userData.username},</h2>
         <WelcomeCard />
        
    </div>)
}
export default Home
