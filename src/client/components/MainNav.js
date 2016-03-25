import React from 'react';
import { Link } from 'react-router';
import Auth from './Auth';

const HeaderNav = ({ onLogoutClick, user }) => { 
  return (

    <div className="header-right header-menu">
      <span className="header-item">
        <Link to="/entries" activeClassName="active" title="Entries">Entries</Link>
      </span>
      <span className="header-item">
        <a href="http://blog.texans.vote/prizes" title="Prizes">Prizes</a>
      </span>
      <span className="header-item">
        <a href="http://blog.texans.vote/govote" title="Go Vote!">Go Vote!</a>
      </span>
      <span className="header-item">
          <Link to={user.isLoggedIn ? `/profile/${user.data.authID}` : '/login'} activeClassName="active" title="Account">Account</Link>
      </span>
      <span className="header-item">
        <a href="http://blog.texans.vote/share" className="button is-outlined" title="Share">Share</a>
      </span>
      {/*<Auth onLogoutClick={onLogoutClick} user={user} />*/}
    </div>
  );
};


module.exports = HeaderNav;
