import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import {Team} from '../../data/Team'
import ProfileList from './ProfileList'

    
      
export default function ProfileCard() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Box>
              <ProfileList Team={Team} />
            </Box>
          </React.Fragment>
        );
      }
      
