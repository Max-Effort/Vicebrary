import React, { useState } from 'react';
import About from './About'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
    },
    button: {
        border: 'none',
        color: 'white',
        maxWidth: '20rem',
        flex: '0 0 10%',
        transition: '.3s ease-in-out',
        transitionDelay: "0.1s",
        fontSize: '.75rem',
        '&:hover': {
            boxShadow: 'inset 0 -5px 5px rgba(255,255,255, .5)'
        }
    },
    appbar: {
        width: '100%',
        display: 'flex',
        zIndex: '1100',
        boxSizing: 'border-box',
        flexShrink: '0',
        flexFlow: 'row wrap',
        justifyContent: 'flex-end',
        gap: '2rem',

    }
}));



export default function Header() {
    const classes = useStyles();
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };


    return ( <
        div className = "header" >
        <
        AppBar className = { classes.appbar } >

        {
            Auth.loggedIn() ? ( <
                Button variant = "outlined"
                className = { classes.button }
                onClick = { logout } >
                Logout <
                /Button>
            ) : ( <
                div >
                <
                Button variant = "outlined"
                color = "white"
                className = { classes.button } >
                <
                Link className = ""
                to = "/login" >
                Login <
                /Link> <
                /Button> <
                Button variant = "outlined"
                color = "white"
                className = { classes.button } >
                <
                Link className = ""
                to = "/signup" >
                Signup <
                /Link> <
                /Button> <
                /div>
            )
        } <
        Button variant = "outlined"
        color = "white"
        type = "Button"
        onClick = { handleOpen }
        className = { classes.button } >
        Meet The Devs <
        /Button>

        <
        Toolbar / >
        <
        /AppBar> <
        About open = { open }
        setOpen = { setOpen }
        /> <
        /div>

    );
};