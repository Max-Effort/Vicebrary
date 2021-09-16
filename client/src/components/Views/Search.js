
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchGrid from './components/SearchGrid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
  },
}}));

export default function Search({userData}) {
  const classes = useStyles();
  return (
    <div className="renderSearch" style={{ width: '100%' }}>
      <div className="search-bg">
      <Container style={{ width: '90%' }} align="center">
        <Typography variant="h4" component="h2" >Search for a Wine!</Typography>
        <Divider />
        <br />
        <form className={classes.root} noValidate autoComplete="off">
          <Box flexGrow={1}>
            <TextField id="filled-basic" label="Enter Vice" variant="filled" /></Box>
          <Box flexGrow={1}>
            <Button variant="contained">Click Me!</Button></Box>
        </form>
      </Container>
      </div>
      <SearchGrid />
    </div>
  )
}