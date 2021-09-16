import React from 'react';
import About from './About'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
}));

export default function Header(){
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
        <div className="header">
    <AppBar>
          {Auth.loggedIn() ? (
            <Button variant="outlined" className="" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
            <Button variant="outlined" color="white" className="">
              <Link className="" to="/login">
                Login
              </Link>
            </Button>
            <Button variant="outlined" color="white" className="">
              <Link className="" to="/signup">
                Signup
              </Link>
            </Button>
            </>
          )}
          <About/>
    <Toolbar/>
      </AppBar>
    </div> 
  
  );
};

