import React from 'react';
import Banner from './Banner';
import Nav from './Nav';
import LanguageSwitch from './LanguageSwitch';

const Header = () => {
  return (
    <div>
      <LanguageSwitch />
      <Banner />
      <Nav />
    </div>
  );
};

export default Header;
