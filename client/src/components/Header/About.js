import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import ProfilesGrid from './ProfilesGrid';
// import {Team} from '../../data/Team';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
      padding: '8px',
    overflowY: 'scroll',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  },
  paper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    justifySelf:'center',
    top:'5%',
    margin: '2%',
    width:'90%',
    minWidth: '320px',
    height:'90%',
    // transform: 'translateX(-50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '1rem'
   
  },
}));

export default function About({open, setOpen}) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="modal-container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Box style={{display:'flex', justifyContent:'center'}}>
        <Fade in={open}>
          <div className={classes.paper}>
            <Container style={{
               overflow: 'auto',
    padding: 0,
    maxWidth: '90%',
    maxHeight:'90%',}}>
            <h2 id="transition-modal-title">Meet Our Squad</h2>
           <ProfilesGrid/>
           </Container>
          </div>
        </Fade>
        </Box>
      </Modal>
      </div>
    </div>
  );
}