import React from 'react';
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
        <div className="renderAdd">
            <Container className = "addWineContainer">
                <div>
                    <h2>Feel Free to Add A New Wine We Have'nt Heard Of!</h2>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Name" variant="outlined" />
                            <TextField id="outlined-basic" label="Year" variant="outlined" />
                            <TextField id="outlined-basic" label="Country" variant="outlined" />
                            <TextField id="outlined-basic" label="Type" variant="outlined" />
                        </form>
                </div>
            </Container>
        </div>
    )
}