import React from 'react'
import BackgroundVideo from '../Background Videos/viceclips.mp4.mov'

function Home({userData}) {
    
    console.dir(userData)
    return (
    <div className="renderHome">
        <h2>Welcome {userData.username},</h2>
        <video autoPlay loop muted id='video'>
            <source src = {BackgroundVideo} type='video/mp4' />
            </video>

    </div>)
}

export default Home
