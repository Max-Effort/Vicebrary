import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid';
import LibraryCards from './components/LibraryCards'
import { Container } from '@material-ui/core'


export default function Library({userData}){
  // const {items} = userData

    return (<div className="renderLibrary">
        <h2 className="pageTitle">{userData.username}'s Library</h2>
        <Container style={{width:'90%'}}>
        <Grid item >
            <LibraryCards />
            {/*items={items}/> */}
            </Grid>
        </Container>
    </div>)
}