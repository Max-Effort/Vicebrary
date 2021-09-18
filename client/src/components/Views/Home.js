import * as React from 'react';
import WelcomeCard from "./components/WelcomeCard"

export default function Home({ userData }) {
    console.log(bull)
    console.dir(userData)
    return (
        <div className="renderHome">
            <h2>Welcome {userData.username},</h2>
            <WelcomeCard />
        </div>
    )

}