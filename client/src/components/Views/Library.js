import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {QUERY_SELF} from '../../utils/queries'
import LibraryCards from './components/LibraryCards'
import { Container } from '@material-ui/core'
// import {userData} from '../../data/userData'
import {testSELF} from '../../dev/testSELF'

export default function Library({userData}){
        console.dir({userData})
 
    return (<div className="renderLibrary">
        <h2>{userData.username}'s Library</h2>
        <Container>
            <LibraryCards testSELF={testSELF}/>
        </Container>
    </div>)
}