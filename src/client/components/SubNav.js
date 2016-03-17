import React from 'react';
import { Link } from 'react-router';

const SubNav = () => {
  return (
    <div className="subnav">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-left">
            <p className="navbar-item"><i className="fa fa-filter"></i>&nbsp;<strong>Filter:</strong></p>
            <p className="navbar-item">
              <Link to='/entries' activeClassName='active'>Latest</Link>
            </p>
            <p className="navbar-item">
              <Link to='/entries' activeClassName='active'>Most Views</Link>
            </p>
          </div>
          <div className="navbar-right">
            <p className="navbar-item">
              <Link to="/entry/new" className="button is-success">Submit Your Entry</Link>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

module.exports = SubNav;
