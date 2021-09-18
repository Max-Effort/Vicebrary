import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

export default function Home({ userData }) {
    console.log (bull)
    console.dir(userData)
    return (
        <div className="renderHome">
            <h2>Welcome {userData.username},</h2>
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Welcome to Vicebrary:
                        an application that allows you to broaden your horizons and your Vices.
                    </Typography>
                    <Typography variant="h5" component="div">
                        Click on the <SearchIcon/> to begin your journey!
                    </Typography>
                    <Typography variant="h5" component="div">
                        Click on the <FavoriteIcon/> to search anything you might have found along the way!
                    </Typography>
                    <Typography variant="h5" component="div">
                        Click on the <AddIcon/> to add a new found desire.
                    </Typography>
                    <Typography variant="body3">
                        Sit down, have a nice glass of wine, stay awhile...
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </React.Fragment>
        </div>
    )

}