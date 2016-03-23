/* eslint max-len: [0] */
import React from 'react';
import { Link } from 'react-router';

const AuthUser = ({ onLogoutClick, userData }) => {
  return (
    <span className="header-item user">
      <a className="user-link" href="#">
        {userData.userName}
        <img className="avatar header is-pulled-right" src={userData.photo} />
      </a>
      <ul>
        <li className="arrow-down"><i className="fa fa-sort-down arrow"></i></li>
        <li><Link to="/profile">My Profile<i className="fa fa-user"></i></Link></li>
        <li><Link to="/" onClick={onLogoutClick} className="last" href="#">Logout<i className="fa fa-sign-out"></i></Link></li>
      </ul>
    </span>
  );
};

module.exports = AuthUser;
