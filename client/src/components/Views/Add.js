import React from 'react';
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
            backgroundColor: 'white',
            margin: theme.spacing(1),
            width: '50ch',
        },
        container: {
            width: '90%',
        },
    },
}));

export default function Add({userData}) {
    const classes = useStyles();
    return (
        <div className="add-bg">
            <div className="renderAdd" style={{ width: '100%' }}>
                <Container className={classes.container} align="center">
                   <Box className={classes.h2box}>
                    <Typography variant="h4" component="h2">Feel Free to Add A New Wine We Haven't Heard Of!</Typography>
                    </Box>
                    <Divider />
                    <br />
                    <form className={classes.form} noValidate autoComplete="off">
                        <Box flexGrow={1}>
                            <TextField style={{ width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic"  color='white' label="Name" variant="filled" /></Box>
                        <Box flexGrow={1}>
                            <TextField style={{ width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic"  label="Year" variant="filled" /></Box>
                        <Box flexGrow={1}>
                            <TextField style={{ width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic"  label="Country" variant="filled" /></Box>
                        <Box flexGrow={1}>
                            <TextField style={{ width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic"  label="Type" variant="filled" /></Box>
                        <Box flexGrow={1}>
                            <TextField style={{ width: '100%', backgroundColor: 'white', boxShadow: 'inset 0 0 5px black'}} id="filled-basic"  fullWidth label="Description" variant="filled" multiline rows={6} /></Box>
                        <Box flexGrow={1}>
                            <Button variant="default">Click Me!</Button></Box>
                    </form>
                </Container>
            </div>
        </div>
    )
}