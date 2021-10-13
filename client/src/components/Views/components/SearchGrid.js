import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { QUERY_WINES } from '../../../utils/queries';
import {getSavedViceIDs, localSavedViceIDs} from '../../../utils/localStorage'
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {SAVE_VICE} from '../../../utils/mutations'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});




export default function SearchGrid({search}) {
  const classes = useStyles()
  const [wineList, setWineList] = useState([])
  // console.dir({wineList})
  const wineDB = useQuery(QUERY_WINES, {
    onCompleted: () => {
      setWineList(wineDB.data.Wines)
    }
  })
  const [savedViceIDs,setSavedViceIDs] = useState(getSavedViceIDs())
  useEffect(()=>{localSavedViceIDs(savedViceIDs)})

  const [saveVice,{loading,error}]=useMutation(SAVE_VICE)

  if (loading) return 'Saving. . .'
  if (error) return `Error occured ${error.message}`

  const handleSaveVice = (e) => {
    // console.log(e.currentTarget.value)
    let id = e.currentTarget.value
    console.log({id})
       saveVice({variables:{vice_id:id, vice_type: 'Wine'}})
       setSavedViceIDs([...savedViceIDs, id])
       

      //  console.log({savedViceIDs})
  }
  // console.log('saved vice id: '+savedViceIDs.length)
const searchString = search ? search.toLowerCase() : null
const filteredWines = wineList?.filter(wine => {
  // console.log(wine.name)
  return(wine.name.toLowerCase().includes(searchString) || wine.description.toLowerCase().includes(searchString) || wine.year.toString().includes(searchString) || wine.type.toLowerCase().includes(searchString));
})

// console.log(filteredWines)
let tagColor
  const wineCards = search ? (filteredWines.map((wine,index) => { 
      return (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card style={{height:'400px'}} className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={wine.imgsrc ? wine.imgsrc : 'https://loremflickr.com/g/320/240/wine,bottle'}
                        title={wine.name}
                      />
                      <CardContent>
                        <Typography gutterBottom style={{color:'burgundy'}} variant="h5" component="h3">
                          {wine._id} | {wine.name}
                        </Typography>
                        <Box style={{height:'125px', overflowY:'scroll'}}>
                        <Typography variant="body2" style={{color:'darkgrey'}} component="p">
                          {wine.description}
                        </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{boxShadow:'0px -10px 7px 0px rgba(0,0,0, .15)'}}>
                      <Button value={wine._id} onClick={handleSaveVice} size="small" color="primary">
                        Add to Vicebrary
                      </Button>
                    </CardActions>
                    {/* <Container > */}
                        <span style={{float:'right', color:'white', fontWeight:'300',  padding:'.25rem 1rem', borderTopLeftRadius: '50px', borderBottomLeftRadius: '5px'}}>{wine.type}</span>
                    {/* </Container> */}
                  </Card>
                </Grid>
              );
      // }
})) :(wineList.map((wine,index) => { 
      if (!savedViceIDs.includes(wine._id)){
        return (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{height:'400px'}} className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={wine.imgsrc ? wine.imgsrc : 'https://loremflickr.com/g/320/240/wine,bottle'}
                          title={wine.name}
                        />
                        <CardContent>
                          <Typography gutterBottom style={{color:'burgundy'}} variant="h5" component="h3">
                            {wine._id} | {wine.name}
                          </Typography>
                          <Box style={{height:'100px', overflowY:'scroll'}}>
                          <Typography variant="body2" style={{color:'darkgrey'}} component="p">
                            {wine.description}
                          </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                      <CardActions style={{boxShadow:'0px -10px 7px 0px rgba(0,0,0, .15)'}}>
                        <Button value={wine._id}  onClick={handleSaveVice} size="small" color="primary">
                          Add to Vicebrary
                        </Button>
                      </CardActions>                        
                      <span id="wineTag" style={{float:'right', color:'white', backgroundColor: (wine.type === 'Merlot' ||wine.type ==='Pinot Noir'||wine.type === 'Zinfandel' ||wine.type === 'Chianti' ||wine.type === 'Beaujolais' ||wine.type === 'Red'||wine.type === 'Malbec'|| wine.type === 'Cabernet') ? ('#470B12') : 
    (wine.type === 'White' ||wine.type === 'Chardonnay' || wine.type ==='Sauvignon Blanc' ||wine.type === 'Riesling' || wine.type ==='Pinot Grigio' || wine.type ==='Prosecco' ||wine.type === 'Sparkling' || wine.type ==='Champagne' || wine.type ==='Dessert Wine' || wine.type ==='Icewine' ||wine.type === 'Moscato') ? '#e8cd5f' : 
    (wine.type === 'Rose' || wine.type === 'Rosé') ? '#ff2994' :('#929292')
, fontWeight:'300', padding:'.25rem 1rem', borderTopLeftRadius: '50px', borderBottomLeftRadius: '5px'}}>{wine.type}</span>
                    
                    </Card>
                  </Grid>
                );
        }
  }))
  
  return (
          <Container align="center">
            <Grid container spacing={1}>
              {wineCards.length ? wineCards : (<Container style={{padding:'1rem', margin:'2rem'}}align="center">
      <Card>
  <h3>No results found. Please try again. . . or don't. It's up to you.</h3>
  </Card>
  </Container>) }
            </Grid>
          </Container>
          )
  }