import React from 'react';
import { Link } from 'react-router';
import Auth from './Auth'

const HeaderNav = () => {
  return (

    <div className="header-right header-menu">
      <span className="header-item">
        <Link to='/about' activeClassName='active'>About</Link>
      </span>
      <span className="header-item">
        <Link to='/blog' activeClassName='active'>Blog</Link>
      </span>
      <Auth />
    </div>
  );
};


module.exports = HeaderNav;
