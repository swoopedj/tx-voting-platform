import React from 'react';

const AuthLogin = () => {
  return (
    <span className="header-item">
      <Link to='/login' activeClassName='active'>Login</Link>
      <Link to='/login' className='button is-outline'>Signup</Link>
    </span>
  );
};

module.exports = AuthLogin;
