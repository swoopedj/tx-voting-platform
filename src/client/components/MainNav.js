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
        <a href="http://blog.texans.vote/entries" title="Prizes">Prizes</a>
      </span>
      <span className="header-item">
        <a href="http://blog.texans.vote/govote" title="Go Vote!">Go Vote!</a>
      </span>
      <span className="header-item">
        <Link to="/profile" activeClassName="active">Account</Link>
      </span>
      <span className="header-item">
        <a href="http://blog.texans.vote/share" title="Go Vote!">Share</a>
      </span>
      {/*<Auth onLogoutClick={onLogoutClick} user={user} />*/}
    </div>
  );
};


module.exports = HeaderNav;
