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
import { QUERY_WINES } from '../../utils/queries';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import SearchGrid from './components/SearchGrid'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


export default function Search() {
   return(
        <div className="renderSearch">
    <h2>This is the Search Page</h2>
    <br></br>
    <SearchGrid />
</div>
)
}