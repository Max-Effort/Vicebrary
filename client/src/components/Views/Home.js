export default function Home({userData}){
    console.dir(userData)
    return (<div className="renderHome">
        <h2>Welcome {userData.username},</h2>
    </div>)
}