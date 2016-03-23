import React from 'react';
import AuthUser from './AuthUser';
import AuthLogin from './AuthLogin';

const Auth = ({ onLogoutClick, user}) => {
  if (user.isLoggedIn) return (<AuthUser onLogoutClick={onLogoutClick} userData={user.data} />);
  return (<AuthLogin />);
};

module.exports = Auth;
