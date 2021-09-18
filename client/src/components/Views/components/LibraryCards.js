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
import {useState} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {REMOVE_ITEM, SAVE_VICE} from '../../../utils/mutations';
import {QUERY_SELF} from '../../../utils/queries'
import {getSavedViceIds} from '../../../utils/localStorage'


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
    const [savedViceIDs,setSavedViceIDs] = useState(getSavedViceIds())
    const [saveVice] = useMutation(SAVE_VICE,{ update(cache, { data: { saveVice }}) {
          const { self } = cache.readQuery({ query: QUERY_SELF });
      cache.writeQuery({
        query: QUERY_SELF,
        data: { Self: { ...self, Items: [...self.Items, saveVice] } },
      });
    } })

   const [selected,setSelected] = useState(false)
   const [removeItem, { error }] = useMutation(REMOVE_ITEM);
   
   const handleNoteToggle = () =>{
     console.log('NoteToggle:', selected)
     setSelected(!selected)
     
    }
    const handleRemoveFromVicebrary = async (vice_id) =>{
     const token = Auth.loggedIn() ? Auth.getToken() : null 
     if (!token){
       return false;
     }

     try{
       const updatedData = await removeItem({
         variables:{vice_id:vice_id},
       });
       console.log(vice_id)
       if(error){
         throw new Error(`So, that shit didn't work`)
       }
     }catch (err) { 
       throw err
      }
    }
    
  const itemCards = items.map((item, index) => {
  if (item.vice[0].imgsrc === ''){
    item.vice[0].imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
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
          <Button tyle={{fontSize:'12px'}}size='small' value="notes" selected={selected} onClick={handleNoteToggle}>
            {selected?'See Note': 'See Description'}
          </Button>
        </span>
        <span>
          <Button size='small' onClick={()=> {
            // REMOVE FROM DB
            }}
            >
            Add/Edit Note
          </Button>
        </span>
        <span>
          <Button size="small" color="primary" onClick={handleRemoveFromVicebrary}>
            Remove From Vicebrary
          </Button>
        </span>
      </Stack>
    </CardActions>
  </Card>
)
}) 
  

  return(
       <Box style={{ display: 'flex', flexFlow: 'row wrap',gap:'1rem', justifyContent:'space-evenly',width:'100%'}}>
          {itemCards}
       </Box>
        )
  }