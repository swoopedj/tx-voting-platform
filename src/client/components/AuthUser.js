/* eslint max-len: [0] */
import React from 'react';
import { Link } from 'react-router';

const AuthUser = ({ onLogoutClick }) => {
  return (
    <span className="header-item user">
      <a className="user-link" href="#">
        Clay
        <img className="avatar header is-pulled-right" src="https://avatars2.githubusercontent.com/u/1420404?v=3&s=400" />
      </a>
      <ul>
        <li className="arrow-down"><i className="fa fa-sort-down arrow"></i></li>
        <li><Link to="/profile">My Profile<i className="fa fa-user"></i></Link></li>
        <li><Link to="/logout" onClick={onLogoutClick} className="last" href="#">Logout<i className="fa fa-sign-out"></i></Link></li>
      </ul>
    </span>
  );
};

module.exports = AuthUser;
