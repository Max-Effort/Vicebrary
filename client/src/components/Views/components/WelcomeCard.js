import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core'
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import CheckIcon from '@mui/icons-material/Check';
// import Stack from '@mui/material/Stack';
// import Chip from '@mui/material/Chip';
// import ToggleButton from '@mui/material/ToggleButton';
// import { useState } from 'react'



const useStyles = makeStyles({
    root: {
        maxWidth: 612.5,
        maxHeight: 700
    },
    media: {
        height: 140,
    },
});


export default function WelcomeCard() {
    const classes = useStyles();

    return (
        <Container align="center">
        <Card className={classes.root}>
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Vicebrary is a user driven community that allows you to broaden your horizons in search of new vices!
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography align="left" variant="h5" component="div">
                        Click on the <SearchIcon /> to begin your journey in search another Vice!
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography align="left" variant="h5" component="div">
                        Click on the <FavoriteIcon /> to search through your personal Vicebrary!
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography align="left" variant="h5" component="div">
                        Click on the <AddIcon /> to add your new found desire to our ever growing database!
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography variant="body3">
                        Sit down, have a nice glass of wine, or whatever floats your boat and stay awhile...
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </React.Fragment>
        </Card>
        </Container>
    )
}