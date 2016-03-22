import React from 'react';
import AuthUser from './AuthUser';

const Auth = ({ onLogoutClick }) => {
  return (
    <AuthUser onLogoutClick={onLogoutClick} />
  );
};

module.exports = Auth;
