import React from 'react';
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function Add(){
    const classes = useStyles();

    return (
        <div className="renderAdd" style={{ width: '100%' }}>
            <Container style={{ width: '90%' }} align="center">
                <Typography variant="h4" component="h2">Feel Free to Add A New Wine We Haven't Heard Of!</Typography>
                <Divider/>
                <br />
                <form className={classes.root} noValidate autoComplete="off">
                    <Box flexGrow={1}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" /></Box>
                    <Box flexGrow={1}>
                        <TextField id="outlined-basic" label="Year" variant="outlined" /></Box>
                    <Box flexGrow={1}>
                        <TextField id="outlined-basic" label="Country" variant="outlined" /></Box>
                    <Box flexGrow={1}>
                        <TextField id="outlined-basic" label="Type" variant="outlined" /></Box>
                    <Box flexGrow={1}>
                        <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={6} /></Box>
                    <Box flexGrow={1}>
                        <Button variant="outlined">Add Wine!</Button></Box>
                </form>
            </Container>
        </div>
    )
}