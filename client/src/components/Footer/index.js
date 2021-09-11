import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer className="">
      <h2>This is the Footer</h2>
    </footer>
  );
};

export default Footer;
