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
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
        container: {
        //   position: "absolute",
          display:"flex",
          justifyContent:"center",
          gap:"1rem",
          height: "90%"
        },
        card: {
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        display: "flex",
        flex: "0 0 45%",
          width: 400,
          height: 500,
          borderRadius: 15,
          "&:hover $media": {
            transform: "translateY(-87px)"
          },
          "&:hover $media img": {
            opacity: 0.5
          },
          "&:hover $actions a": {
            transform: "translateY(0px)",
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
        //   position: "absolute",
          top: 0,
          left: 0,
          width: "400px",
          height: "auto",
          transition: "0.5s",
          zIndex: 2,
          background: theme.palette.primary.main,
          "& img": {
              width:"400px",
              height:"400px",
            transition: "0.5s"
          }
        },
        actions: {
          position: "relative",
          top: "50%",
          left: "50%",
        transform: "translate(-220%, -10%)",
          zIndex: 3,
          padding: 0,
          display: "flex",
          "& a": {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            lineHeight: "50px",
            textAlign: "center",
            margin: "0 5px",
            borderRadius: "50%",
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            transition: "0.5s",
            transform: "translateY(200px)",
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
        // flex:1,
        // justifySelf: "flex-end",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: `${theme.spacing(2)}px 0px`,
          textAlign: "center",
          zIndex: 1,
          background: "#470B12",
          color: "white",
          "& span": {
            color: "white",
            fontSize: 16
          }

        }, 
        subheader:{
            color:"white"
        }
      }));



export default function ProfileList({Team}){

    const classes = useStyles();
const devCards = Team.map((dev,index)=>{
    return (
        <Box>
            
        <Card key={index} className={classes.card} elevation={16}>
              <CardContent className={classes.media}>
                <img src={dev.imgsrc} alt={`${dev.name}'s Profile Picture'`} />
              <CardHeader
              style={{color:"white"}}
                title={dev.name}
                subheader={dev.skills}
                />
                
              </CardContent>
              <CardActions className={classes.actions} disableSpacing>
                <Link href={`http://linkedin.com/in/${dev.linkedIn}`}>
                  <LinkedInIcon />
                </Link>
                <Link href={`http://github.com/${dev.github}`}>
                 <GitHubIcon />
                </Link>
                <Link href={`mailto:${dev.email}`}>
                 <MailOutlineIcon />
                </Link>
                <Link href="http://github.com/Max-Effort/">
                  <BusinessIcon />
                </Link>
              </CardActions>
            </Card>
                </Box>
          );
          
        })
        return (
         
          <Grid
            className={classes.container}
            container
            alignItems="flexStart"
            justify="spaceEvenly"
          >

            {devCards}
          </Grid>
          
        );

        }