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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflowY:'auto',
    padding: theme.spacing(1)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
   
  },
}));

export default function About() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="white" type="Button" onClick={handleOpen}>
        About MaxEffort
      </Button>
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
        <Box>
        <Fade in={open}>
          <div className={classes.paper}>
            <Container style={{
               overflow: 'auto',
    padding: '5rem 5rem',
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