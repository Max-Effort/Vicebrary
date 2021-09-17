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

  
  export default function LibraryCards({testSELF}) {  
  const classes = useStyles();
  console.log({testSELF})
  const [selected,setSelected] = useState(false)
const itemCards = testSELF.items.map((item) => {
 
  return (
      <Card data-vice={item.vice_type} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.imgsrc}
            title={item.name}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name} 
            </Typography>
          <Stack
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
  spacing={2}
>
      <Chip size='small' label={item.year} />
      <Chip size='small' label={item.country}/>
     <Chip size='small' label={item.type}       />
            </Stack>
            <hr/>
  
            <Typography variant="body2" color="textSecondary" component="p">
            {selected ? (item.note) : item.description}
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
            <ToggleButton
            size='small'
      value="notes"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon />
    </ToggleButton>
    </span>
    <span>
    <ToggleButton
    size='small'
      value="removeItem"
      selected={selected}
      onClick={() => {
        // REMOVE FROM DB 
      }}
    >
      <CheckIcon />
    </ToggleButton>
    </span>
    <span>
          <Button size="small" color="primary">
           X
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