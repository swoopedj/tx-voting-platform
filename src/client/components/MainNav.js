import React from 'react';
import { Link } from 'react-router';
import Auth from './Auth'

const HeaderNav = () => {
  return (

    <div className="header-right header-menu">
      <span className="header-item">
        <Link to='/entry/new' activeClassName='active'>Login</Link>
      </span>
      <Auth />
    </div>
  );
};


module.exports = HeaderNav;
