import React, {useState} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
// import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    zIndex:'1000',
    paddingBottom:'.25rem',
    width:'100%',
    maxWidth: 500,
  },
});

const Footer = ({setPage,page,handleChange}) => {
  const classes = useStyles();
  const [value, setValue] = useState(page);

  // const location = useLocation();
  // const history = useHistory();
  return (
    <footer className="footer" style={{zIndex:'999'}}>
      <BottomNavigation
      align='center'
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          onClick={(e)=> setValue('home')}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Library"
          value="library"
          onClick={(e)=> setValue('library')}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          onClick={(e)=> setValue('search')}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Add"
          value="add"
          onClick={(e)=> setValue('add')}
          icon={<AddIcon />}
        />
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
