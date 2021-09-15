import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {QUERY_SELF} from '../../utils/queries'
import LibraryCards from './components/LibraryCards'
import { Container } from '@material-ui/core'
// import {userData} from '../../data/userData'

export default function Library(){
     // USER DATA FOR USE IN UNDERLYING COMPONENTS
     const [userData, setUserData] = useState({});
     const { data } = useQuery(QUERY_SELF, {
         onCompleted: () => {
             setUserData(data.Self)
         }
     });
     console.dir({userData})
 
    return (<div className="renderLibrary">
        <h2>{userData.username}'s Library</h2>
        <Container>
            <LibraryCards userData={userData}/>
        </Container>
    </div>)
}