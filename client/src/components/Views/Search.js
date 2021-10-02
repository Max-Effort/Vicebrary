import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchGrid from './components/SearchGrid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { QUERY_WINES } from '../../utils/queries';
import {getSavedViceIDs, localSavedViceIDs} from '../../utils/localStorage'
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {SAVE_VICE} from '../../utils/mutations'


const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: '500px',
      minWidth: '200px'
  }, 
},
  container: {
    width: "90%",

  },
})
);

export default function Search({ userData }) {
  const classes = useStyles();
 const [searchInput, setSearchInput] = useState('')
 const [search,setSearch] = useState('')

 const handleInputChange = (e) =>{
   setSearch(e.target.value)
 }

 const handleEnter=(e)=>{
   if (e.key === 'Enter'){
    e.preventDefault()
    console.log(`No need to hit enter, it's a live search`)
  }
  return
 }
//  const handleSubmit=(e)=>{
//    e.preventDefault()
//    setSearch(searchInput)
//  }

 console.log(`FILTER: ${search}`)
 useEffect(() => {console.log(searchInput)})

  return (
    <div className="renderSearch" style={{ width: '100%' }}>
      <div className="search-bg">
      <Container style={{ width: '100%' }} align="center">
        <br />
        <Typography className="pageTitle" variant="h4" component="h2" >Search for a Wine!</Typography>
        <Divider />
        <br />
        <form className={classes.form} autoComplete="off">
          <Box flexGrow={1}>
            <TextField style={{width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic" label="Enter Search Criteria" variant="filled" name="search" onKeyPress={(e)=>handleEnter(e)} onChange={(e)=>{handleInputChange(e)}} />
          </Box>
          {/* <Box flexGrow={1}>
            <Button type="button" style={{ width: '100%' }} onClick={handleSubmit} variant="contained">Search</Button>
          </Box> */}
        </form>
      </Container>
      <SearchGrid search={search ? search : null}/>
      </div>
    </div>
  )
}