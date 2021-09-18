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


export default function SearchGrid() {
  const [wineList, setWineList] = useState([])
console.dir({wineList})
  const wineDB = useQuery(QUERY_WINES, {
    onCompleted: () => {
      setWineList(wineDB.data.Wines)
    }
  })

  const [saveWine,{data}]=useMutation(SAVE_VICE)

  const handleSaveWine = (e) => {
    let id = e.target.parentNode.attributes[3].value
       saveWine({variables:{vice_id:id, vice_type: 'Wine'}})
       alert('It was added to your vicebrary . . . trust us.')

  }
 
    const classes = useStyles();

    const wineCards = wineList.map((wine,index) => {
      // console.log('vice_id:',wine._id)
 

      if (wine.imgsrc == ''){
        wine.imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
      }

      return (
      <Grid item key={index} xs={3}>
        <Card style={{height:'400px'}} className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={wine.imgsrc}
              title={wine.name}
            />
            <CardContent>
              <Typography gutterBottom style={{color:'burgundy'}} variant="h5" component="h3">
                {wine.name}
              </Typography>
              <Box style={{height:'125px', overflowY:'scroll'}}>
              <Typography variant="body2" color="darkgrey" component="p">
                {wine.description}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button value={wine._id} onClick={handleSaveWine} size="small" color="primary">
              Add to Vicebrary
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  })
  return (
    <Container>
      <Grid container spacing={1}>
        {wineCards}
      </Grid>
    </Container>
  )
}