import React from 'react';

const AuthUser = () => {
  return (
    <span className="header-item user">
      <a className="user-link" href="#">
        Clay
        <img className="avatar header is-pulled-right" src="https://avatars2.githubusercontent.com/u/1420404?v=3&s=400" />
      </a>
      <ul>
        <li className="arrow-down"><i className="fa fa-sort-down arrow"></i></li>
        <li><a className="cta" href="#">Submit Entry<i className="fa fa-bullhorn"></i></a></li>
        <li><a href="/profile">My Profile<i className="fa fa-user"></i></a></li>
        <li><a className="last" href="#">Logout<i className="fa fa-sign-out"></i></a></li>
      </ul>
    </span>
  );
};

module.exports = AuthUser;
