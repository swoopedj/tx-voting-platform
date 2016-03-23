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
        <Link to="/about" activeClassName="active">About</Link>
      </span>
      <span className="header-item">
        <Link to="/entry/new" className="button is-primary is-small is-outlined">Submit Your Entry</Link>
      </span>
      <Auth onLogoutClick={onLogoutClick} user={user} />
    </div>
  );
};


module.exports = HeaderNav;
