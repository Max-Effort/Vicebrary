import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BusinessIcon from '@material-ui/icons/Business';


const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  control: {
      padding: theme.spacing(2),
  },
  container: {
      display: "flex",
      justifyContent: "center",
      margin:'0',
      gap: "1rem",
      width:'100%',
      height: "100%"
  },
  card: {
    width: '100% !important',
    height: '100% !important',
    maxWidth: '90%',
    minHeight: '150px',
    borderRadius: '15px',
      "&:hover $media": {
          transform: "translateY(-90px)"
      },
      "&:hover $media img": {
          opacity: 0.5
      },
      "&:hover $actions a": {
          transform: "translateY(-100%)",
          opacity: 1
      },
      "&:hover $actions a:nth-child(1)": {
          transitionDelay: "0s"
      },
      "&:hover $actions a:nth-child(2)": {
          transitionDelay: "0.1s"
      },
      "&:hover $actions a:nth-child(3)": {
          transitionDelay: "0.2s"
      },
      "&:hover $actions a:nth-child(4)": {
          transitionDelay: "0.3s"
      }
  },
  media: {
      padding: 0,
      top: 0,
      left: 0,
      width: '100% !important',
      height: '100%',
      minwidth: '200px',
      minHeight: '250px',
      maxWidth: '400px',
      transition: "0.5s",
      zIndex: 2,
      background: theme.palette.primary.main,
      "& img": {
          minWidth: '200px',
          minHeight: '250px',
          width: '100%',
          maxHeight: '500px',
          transition: "0.5s"
      }
  },
  actions: {
      position: "relative",
      top: "50%",
      left: "0",
      width: "100%",
      transform: 'translate(0%, -500%)',
      zIndex: 3,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      "& a": {
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          lineHeight: "50px",
          textAlign: "center",
          margin: "0 .15rem",
          borderRadius: "50%",
          boxShadow: '0 0 5px white, 0 5px 15px #00000087',
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          transition: "0.5s",
          transform: "translateY(-50%)",
          opacity: 0,
          "&:hover": {
              textDecoration: "none",
              "& .fab": {
                  transform: "rotateY(360deg)"
              }
          },
          "& .fab": {
              fontSize: 22,
              transition: "0.8s"
          }
      }
  },
  header: {
      position: "relative",
      bottom: 0,
      left: 0,
      width: "350px",
      padding: `0px`,
      textAlign: "center",
      zIndex: 1,
      background: "#470B12",
      color: "white",
      "& span": {
          color: "white",
          fontSize: 16
      }

  },
  subheader: {
      color: "white"
  }
}));



export default function ProfileList({Team}){
  const classes = useStyles();  
  const devCards = Team.map((dev,index)=>{
    return (
          <Box style={{flex:'0 0 30%',maxWidth: '400px', justifyContent:'space-around'}}>
            <Card key={index} className={classes.card} elevation={16}>
              <CardContent className={classes.media}>
                <img title={dev.bio} src={dev.imgsrc} alt={`${dev.name}'s Profile'`} />
                <CardHeader style={{color:"white"}} title={dev.name} subheader={dev.skills} />

              </CardContent>
              <CardActions className={classes.actions} disableSpacing>
                <Link href={`http://linkedin.com/in/${dev.linkedin}`} target="_blank">
                <LinkedInIcon />
                </Link>
                <Link href={`http://github.com/${dev.github}`} target="_blank">
                <GitHubIcon />
                </Link>
                <Link href={`mailto:${dev.email}`}>
                <MailOutlineIcon />
                </Link>
                <Link href="http://github.com/Max-Effort/" target="_blank">
                <BusinessIcon />
                </Link>
              </CardActions>
            </Card>
          </Box>
      );
          
  })
  return (
          <Grid className={classes.container} container alignItems="flexStart" justify="spaceEvenly">
            {devCards}
          </Grid>
          );

}