import React from 'react';
import { Link } from 'react-router';

const AuthLogin = () => {
  return (
    <span className="header-item">
      <Link to="/login" activeClassName="active">Login</Link>
    </span>
  );
};

module.exports = AuthLogin;
