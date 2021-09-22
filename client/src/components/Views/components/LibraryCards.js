import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Auth from '../../../utils/auth'
import {useState, useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {REMOVE_ITEM, SAVE_VICE} from '../../../utils/mutations';
import {QUERY_SELF} from '../../../utils/queries'
import {getSavedViceIDs, localSavedViceIDs} from '../../../utils/localStorage'


const useStyles = makeStyles({
    root: {
      maxWidth: 350,
      maxHeight: 400
    },
    media: {
      height: 140,
    },
  });

  
  export default function LibraryCards({items}) {  
    
  const classes = useStyles();
    // get My data
    const [vicebraryIDs,setVicebraryIDs] = useState(getSavedViceIDs())
    
    const [selected,setSelected] = useState(false)
    // useEffect(()=>{localSavedViceIDs(vicebraryIDs)})
   const [removeItem, {loading, error }] = useMutation(REMOVE_ITEM);
   
   const handleNoteToggle = (e) =>{
     console.log('NoteToggle:', e.currentTarget.selected)
    // e.currentTarget.selected = !e.currentTarget.selected

    e.currentTarget.selected= setSelected(!selected)
     
    }

    const handleRemoveFromVicebrary = async (v) =>{
    const viceID = v.currentTarget.value
    
    const updatedViceIdArray = vicebraryIDs.filter((id)=> id !== viceID)
    console.log(`updatedViceIdArray = ${JSON.stringify(updatedViceIdArray)}`)
    const token = Auth.loggedIn() ? Auth.getToken() : null 
    if (!token){
      return false;
    }
    
    try{
      await removeItem({variables:{vice_id:viceID}});
      //    console.log(viceID)
      if(loading){
        console.log(`Loading. . .`)
      }
      if(error){
        throw new Error(`So, that shit didn't work`)
      }
      setVicebraryIDs(updatedViceIdArray)
      return updatedViceIdArray
    }catch (err) { 
      throw err
    }

    } 
  useEffect(() =>{
    localSavedViceIDs(vicebraryIDs)}
    )

    let freshItems = items.filter((item)=> vicebraryIDs.includes(item.vice_id))
    console.log(`FRESH_ITEMS: ${freshItems}`)
  const itemCards = freshItems.map((item, index) => {
    if (!vicebraryIDs){
      return <Card>
         <span>
      <h2 style={{color:'white'}}>You have not saved any vices yet, you saint.</h2>
          </span>
        </Card>
    }
    if (item.vice.imgsrc === ''){
    item.vice.imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
  }
  return (
    <Card key={index} data-vice={item.vice_type} className={classes.root}>
    <CardActionArea>
        <CardMedia className={classes.media} image={item.vice[0].imgsrc} title={item.vice[0].name} />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.vice[0].name}
        </Typography>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
          <Chip size='small' label={item.vice[0].year} />
          <Chip size='small' label={item.vice[0].country} />
          <Chip size='small' label={item.vice[0].type} />
        </Stack>
        <hr />
        <Box style={{height:'100px', overflowY:'scroll'}}>
        <Typography variant="body2" color="darkgrey" component="p">
          {selected ? (item.note) : item.vice[0].description}
        </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <span>
          <Button style={{fontSize:'12px'}} size='small' value="notes" selected={selected} onClick={handleNoteToggle}>
            {selected?'See Note': 'See Description'}
          </Button>
        </span>
        <span>
          <Button size='small' onClick={()=> {
           alert(`This is a paid feature. \n . . . not really, it just doesn't work yet.`)
            }}
            >
            Add/Edit Note
          </Button>
        </span>
        <span>
          <Button  value={item.vice_id} size="small" color="primary" onClick={handleRemoveFromVicebrary}>
            Remove From Vicebrary
          </Button>
        </span>
      </Stack>
    </CardActions>
  </Card>
)
} )
  

  return(
       <Box style={{ display: 'flex', flexFlow: 'row wrap',gap:'1rem', justifyContent:'space-evenly',width:'100%'}}>
          {itemCards}
       </Box>
        )
  }