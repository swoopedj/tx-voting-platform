import React from 'react';
import { Link } from 'react-router';
import Auth from './Auth';

const HeaderNav = ({ onLogoutClick, user }) => {
  return (

    <div className="header-right header-menu">
      <span className="header-item">
        <Link to="/entries" activeClassName="active">Entries</Link>
      </span>
      <span className="header-item">
        <Link to="/prizes" activeClassName="active">Prizes</Link>
      </span>
      <span className="header-item">
        <Link to="/about" activeClassName="active">Go Vote!</Link>
      </span>
      <span className="header-item">
        <Link to="/profile" activeClassName="active">Account</Link>
      </span>
      <span className="header-item">
        <Link to="/share" className="button is-outlined">Share</Link>
      </span>
      {/*<Auth onLogoutClick={onLogoutClick} user={user} />*/}
    </div>
  );
};


module.exports = HeaderNav;
