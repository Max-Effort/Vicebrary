import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Auth from '../../../utils/auth'
import {useState, useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {REMOVE_ITEM, SAVE_NOTE} from '../../../utils/mutations';
import {QUERY_ITEMS,QUERY_NOTE} from '../../../utils/queries'
import {} from '@apollo/react-hooks'
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
    
  export default function LibraryCards() {  
   const [items,setItems] = useState([])
  const {loading , error, data} = useQuery(QUERY_ITEMS);
 

  useEffect(() => {
    if (data){
     return setItems(data.Items)
    }
    if (loading) return `Loading. . .`
    if (error) return `Something went wrong. . .`
  })

  const classes = useStyles();

  //Note Dialog State
  const [open, setOpen] = useState(false);
  const [noteInfo, setNoteInfo] = useState({name:'', item_id:'', content:''})
  const [noteContent, setNoteContent] = useState('')
  // const [noteArgs, setNoteArgs] = useState({})
  
  // Get my viceList from localStorage
  const [vicebraryIDs,setVicebraryIDs] = useState(getSavedViceIDs())

  // Description or Note toggle
  const [selected,setSelected] = useState(false)

  // Mutations
  const [removeItem, {itemLoading, itemError }] = useMutation(REMOVE_ITEM);
  const [saveNote, {noteLoading, noteError }] = useMutation(SAVE_NOTE);
// DialogueBox Open and Close
  const handleOpen = (e) => {
    // const itemID = e.currentTarget.value
    // //console.log({itemID})
    setNoteInfo({
      name: e.currentTarget.name, 
      item_id:e.currentTarget.value,
      content:''
    })
    setOpen(true);
    //console.table({noteInfo:noteInfo})
  }
  const handleClose = () => setOpen(false);

  const handleNoteToggle = (e) =>{
    //console.log('NoteToggle:', e.currentTarget.selected)
  // e.currentTarget.selected = !e.currentTarget.selected

  e.currentTarget.selected= setSelected(!selected)
    
  }

  const handleNoteChange=(e) => {
    const content = e.currentTarget.value
    setNoteContent(content)
  }
  useEffect(() =>setNoteInfo({item_id: noteInfo.item_id, name: noteInfo.name ,content: noteContent}),[noteContent])
  
  const handleSaveNote = async ()=>{
    //should be able to use spread operator, but not working or some reason
    setNoteInfo({item_id: noteInfo, name: noteInfo.name ,content: noteContent})
    //console.table(noteInfo)
    const {item_id, content} = noteInfo
    console.log(`Note ITEM ID: ${item_id} \n Content: ${content}`)
    const token = Auth.loggedIn() ? Auth.getToken() : null 
    if (!token){
      return false;
    }

    try{
      const newNote = await saveNote({variables:{item_id:item_id,content:content},returnOriginal:false});
      console.dir({newNote})
      if(noteLoading){
      console.log(`Loading. . .`)
      }
      if(noteError){
        throw new Error(`So, that shit didn't work`)
      }
    
      // setNoteInfo()
      setOpen(false);
      return newNote
    }catch (err) { 
      throw err
    }
}
    const handleRemoveFromVicebrary = async (v) =>{
    const viceID = v.currentTarget.value
    
    const updatedViceIdArray = vicebraryIDs.filter((id)=> id !== viceID)
    //console.log(`updatedViceIdArray = ${JSON.stringify(updatedViceIdArray)}`)
    const token = Auth.loggedIn() ? Auth.getToken() : null 
    if (!token){
      return false;
    }
    
    try{
      await removeItem({variables:{vice_id:viceID}});
      //    console.log(viceID)
      if(itemLoading){
        console.log(`Loading. . .`)
      }
      if(itemError){
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


    //console.table(vicebraryIDs)
    //console.table(items)
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
    if (item.vice[0].imgsrc === ''){
    item.vice[0].imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
  }
  return (
    <Card key={index} data-vice={item.vice_type} className={classes.root}>
    <CardActionArea>
        <CardMedia className={classes.media} image={item.vice[0].imgsrc} title={item.vice[0].name} />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.vice[0].name} | {item._id}
        </Typography>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
          <Chip size='small' label={item.vice[0].year} />
          <Chip size='small' label={item.vice[0].country} />
          <Chip size='small' label={item.vice[0].type} />
        </Stack>
        <hr />
        <Box style={{height:'100px', overflowY:'scroll'}}>
        <Typography variant="body2" style={{color:"darkgrey"}} component="p">
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
          <Button value={item._id} name={item.vice[0].name} size='small' onClick={handleOpen}
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
    <Dialog 
    fullWidth={true}
    maxWidth='lg'
    open={open} 
    onClose={handleClose}>
        <DialogTitle>Note for {noteInfo.name ?(noteInfo.name): 'this'}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{padding: '2rem'}}>
          <TextField style={{ width: '100%',backgroundColor: 'white'}} onChange={handleNoteChange} fullWidth label="Write your personal thoughts about this vice" variant="outlined" multiline rows={6}></TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveNote}>Save</Button>
        </DialogActions>
      </Dialog>
  </Card>
)
} )
  

  return(
       <Box style={{ display: 'flex', flexFlow: 'row wrap',gap:'1rem', justifyContent:'space-evenly',width:'100%'}}>
          {itemCards}
       </Box>
        )
  }