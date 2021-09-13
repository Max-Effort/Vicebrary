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
    width: 500,
  },
});

const Footer = ({setPage,page,handleChange}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(page);

  // const location = useLocation();
  // const history = useHistory();
  return (
    <footer className="footer">
      <BottomNavigation
      align='center'
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Library"
          value="library"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Add"
          value="add"
          icon={<AddIcon />}
        />
      </BottomNavigation>
    </footer>
  );
};

export default Footer;
