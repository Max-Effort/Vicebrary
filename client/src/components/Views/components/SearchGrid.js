import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
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
import { useQuery } from '@apollo/react-hooks';

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

    const wineDB = useQuery(QUERY_WINES, {
        onCompleted: () => {
            setWineList(wineDB.data.Wines)
        }
    })

    console.dir({wineList})
    const classes = useStyles();

    const wineCards = wineList.map((wine,index) => {
      if (wine.imgsrc == ''){
        wine.imgsrc = 'https://loremflickr.com/g/320/240/wine,bottle'
      }

      return (
      <Grid item key={index} xs={3}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={wine.imgsrc}
              title={wine.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {wine.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {wine.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="x-small" color="primary">
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