import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Auth from '../../../utils/auth'
import {useState, useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {REMOVE_ITEM, SAVE_NOTE} from '../../../utils/mutations';
import {QUERY_ITEMS} from '../../../utils/queries'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {getSavedViceIDs, localSavedViceIDs} from '../../../utils/localStorage'


const useStyles = makeStyles({
    root: {
      overflow: 'hidden',
      backgroundColor: 'rgba(255,255,255,.5)',
      flex: '0 0 33%',
      minWidth:200,
      maxWidth: 250,
      maxHeight: 350
    },
    media: {
      height:150,

      '& img': {
        objectFit: 'contain',
        width:'100%',
        height: 'auto'
      }
    },
  });
    
export
default
function LibraryCards() {
    const [items, setItems] = useState([])
    const { loading, error, data } = useQuery(QUERY_ITEMS);


    useEffect(() => {
        if (data) {
            return setItems(data.Items)
        }
        if (loading) return `Loading. . .`
        if (error) return `Something went wrong. . .`
    })

    const classes = useStyles();

    //Note Dialog State
    const [open, setOpen] = useState(false);
    const [noteInfo, setNoteInfo] = useState({ name: '', item_id: '', content: '' })
    const [noteContent, setNoteContent] = useState('')
        // const [noteArgs, setNoteArgs] = useState({})

    // Get my viceList from localStorage
    const [vicebraryIDs, setVicebraryIDs] = useState(getSavedViceIDs())

    // Description or Note toggle
    const [selected, setSelected] = useState({0:false})

    // Mutations
    const [removeItem, { itemLoading, itemError }] = useMutation(REMOVE_ITEM);
    const [saveNote, { noteLoading, noteError }] = useMutation(SAVE_NOTE);
    // DialogueBox Open and Close
    const handleOpen = (e) => {
        // const itemID = e.currentTarget.value
        //console.log({itemID})
        setNoteInfo({
            name: e.currentTarget.name,
            item_id: e.currentTarget.value,
            content: e.currentTarget.content
        })
        setOpen(true);
        //console.table({noteInfo:noteInfo})
    }
    const handleClose = () => setOpen(false);

    const handleNoteToggle = (index,e) => {
 e.target.value = !e.target.value
      console.log(`INDEX: ${index}`)
      console.log(`VALUE: ${e.target.value}`)
       setSelected({...selected, [index]: e.target.value})
       
       
      }
      useEffect(()=>{
        console.table(selected)})

    const handleNoteChange = (e) => {
        const content = e.currentTarget.value
        setNoteContent(content)
    }
    useEffect(() => setNoteInfo({ item_id: noteInfo.item_id, name: noteInfo.name, content: noteContent }), [noteContent])

    const handleSaveNote = async() => {
        //should be able to use spread operator, but not working or some reason
        setNoteInfo({ item_id: noteInfo, name: noteInfo.name, content: noteContent })
            //console.table(noteInfo)
        const { item_id, content } = noteInfo
        // console.log(`Note ITEM ID: ${item_id} \n Content: ${content}`)
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false;
        }

        try {
            const newNote = await saveNote({ variables: { item_id: item_id, content: content }, returnOriginal: false });
            console.dir({ newNote })
            if (noteLoading) {
                console.log(`Loading. . .`)
            }
            if (noteError) {
                throw new Error(`So, that shit didn't work`)
            }

            // setNoteInfo()
            setOpen(false);
            return newNote
        } catch (err) {
            throw err
        }
    }
    const handleRemoveFromVicebrary = async(v) => {
        const viceID = v.currentTarget.value

        const updatedViceIdArray = vicebraryIDs.filter((id) => id !== viceID)
            //console.log(`updatedViceIdArray = ${JSON.stringify(updatedViceIdArray)}`)
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false;
        }

        try {
            await removeItem({ variables: { vice_id: viceID } });
            //    console.log(viceID)
            if (itemLoading) {
                console.log(`Loading. . .`)
            }
            if (itemError) {
                throw new Error(`So, that shit didn't work`)
            }
            setVicebraryIDs(updatedViceIdArray)
            return updatedViceIdArray
        } catch (err) {
            throw err
        }

    }
    useEffect(() => {
        localSavedViceIDs(vicebraryIDs)
    })


    //console.table(vicebraryIDs)
    //console.table(items)
    let freshItems = items.filter((item) => vicebraryIDs.includes(item.vice_id))

    const itemCards = freshItems.map((item, index) => {

                if (!vicebraryIDs) {
                    return <Card >
                              <span>
                                <h2 style = {{ color: 'white'}}> You have not saved any vices yet, you saint. </h2> 
                              </span> 
                            </Card>
                }
  return (
    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card data-vice={item.vice_type} className={classes.root}>
            <CardHeader
              style={{ padding:'.1rem .5rem', zIndex:1000,fontWeight:'800',backgroundColor:'rgba(255,255,255,.85)', textShadow:'0px -1px 3px rgba(255, 255, 255, 1), 0px 0px 1px rgba(0, 0, 0, 1)'}}
              title={item.vice[0].name} subheader={`${item.vice[0].year} | ${item.vice[0].country} | ${item.vice[0].type}`} />
            <CardMedia className={classes.media} image={item.vice[0].imgsrc ? item.vice[0].imgsrc : 'https://loremflickr.com/g/320/240/wine,bottle'} title={item.vice[0].name} />
            <Box
              style={{  height: '100px', boxSizing: 'content-box', marginRight:'3%',width:'99%', overflowY:'auto', overflowX:'hidden'}}>
              <Typography variant="body2"
                style={{fontFamily:'Roboto',fontSize:'calc(11px + .25vw)', color:'black', width:'100%', backgroundColor:'rgba(255,255,255,.85)',marginLeft:'-1.25%', padding:'.25rem'}}
                component="p">
                {selected[index] ? (item.note) : item.vice[0].description}
              </Typography>
            </Box>
            <Stack
              style={{ backgroundColor:'rgba(255,255,255,.85)', width:'100%', margin:'0', padding:'.25rem 0 0 0', boxShadow:'0px -2px 26px 0px #000000'}}
              direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <span style={{margin:'0', padding:'0'}}>
                <Button style={{fontSize:'12px'}} title={!selected?'See Note': 'See Description' } size='small' defaultValue={false}
                      value={selected[{index}]} onClick={(e)=>handleNoteToggle(index, e)}>
                  <VisibilityIcon style={{color:'blue'}} />
                </Button>
              </span>
              <span>
                <Button title='Add/Edit Note' value={item._id} content={item.note} name={item.vice[0].name} size='small'
                  onClick={handleOpen}>
                  <EditIcon style={{color:'black'}} />
                </Button>
              </span>
              <span>
                <Button title='Remove from Vicebrary' value={item.vice_id} size="small" color="primary"
                  onClick={handleRemoveFromVicebrary}>
                  <RemoveCircleOutlineIcon style={{color:'red'}} />
                </Button>
              </span>
            </Stack>
            <Dialog fullWidth={true} maxWidth='lg' open={open} onClose={handleClose}>
              <DialogTitle>Note for {noteInfo.name ?(noteInfo.name): 'this'}</DialogTitle>
              <DialogContent>
                <DialogContentText style={{padding: '2rem'}}>
                  <TextField style={{ width: '100%',backgroundColor: 'white'}} onChange={handleNoteChange} fullWidth
                    label="Write your personal thoughts about this vice" defaultValue={noteInfo.content} variant="outlined"
                    multiline rows={6}></TextField>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveNote}>Save</Button>
              </DialogActions>
            </Dialog>
          </Card>
          </Grid>
    )
} )
  

  return(
    <Container style={{width: '100%'}} align="center">
    <Grid container style={{gap: '1rem .5rem'}} justify="space-evenly">
      {itemCards}
    </Grid>
  </Container>
        )
  }