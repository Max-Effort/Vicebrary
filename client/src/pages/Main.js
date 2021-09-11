import Auth from '../utils/auth'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Redirect} from 'react-router-dom'

export default function Main() {
     if(!Auth.loggedIn()) {
         console.log(Auth.loggedIn())
      return   <Redirect to='/login'></Redirect>
     }
    

    return(
        <div className="mainPage">
    <Header />
        <h2>This is the main page after login.</h2>
    <Footer />
    </div>
    )
}