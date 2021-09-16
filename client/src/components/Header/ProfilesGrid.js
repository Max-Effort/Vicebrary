import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Link from "@material-ui/core/Link";
// import Icon from "@material-ui/core/Icon";
import {Team} from '../../data/Team'
import ProfileList from './ProfileList'

    
      
export default function ProfileCard() {
        // const classes = useStyles();
        return (
          <React.Fragment>
            <CssBaseline />
            <Box>
              <ProfileList Team={Team} />
            </Box>
          </React.Fragment>
        );
      }
      
