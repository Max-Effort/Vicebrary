import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import {useState} from 'react'



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
    const [selected,setSelected] = useState(false)
const itemCards = items.map((item, index) => {
  console.dir({item})
console.log(item.vice[0].imgsrc)

const handleNoteToggle = () =>{
  console.log('NoteToggle:', selected)
  setSelected(!selected)

}

  return (
      <Card data-vice={item.vice_type} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.vice[0].imgsrc}
            title={item.vice[0].name}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.vice[0].name} 
            </Typography>
          <Stack
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
  spacing={2}
>
      <Chip size='small' label={item.vice[0].year} />
      <Chip size='small' label={item.vice[0].country}/>
     <Chip size='small' label={item.vice[0].type}       />
            </Stack>
            <hr/>
  
            <Typography variant="body2" color="textSecondary" component="p">
            {selected ? (item.note) : item.vice[0].description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}
>
  <span>
            <Button
            size='small'
      value="notes"
      selected={selected}
      onClick={handleNoteToggle}
    >
     {selected?'See Note': 'See Description'} 
    </Button>
    </span>
    <span>
    <Button
    size='small'
      onClick={() => {
        // REMOVE FROM DB 
      }}
    >
      Add/Edit Note
    </Button>
    </span>
    <span>
          <Button size="small" color="primary">
           Remove From Vicebrary
          </Button>
          </span>
    </Stack>
        </CardActions>
      </Card>
    )})

  return( 
  <Box>
    {itemCards}
  </Box>)

  }