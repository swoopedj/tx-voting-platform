import React from 'react';
import { Link } from 'react-router';

const NoMatch = () => {
  return (
    <div className="columns">
      <div className="column is-half is-offset-quarter">
        <div className="box">
          <h1 className="title">Sorry, we couldn't find that page.</h1>
          <hr />
          <h2 className="title is-5">Some links to get you back:</h2>
          <ul className="is-text-larg">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/entries'>Entries</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

module.exports = NoMatch;
