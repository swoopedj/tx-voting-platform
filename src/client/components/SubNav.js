import React from 'react';
import { Link } from 'react-router';

const SubNav = () => {
  return (
    <div className="subnav">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-left">
            <p className="navbar-item"><strong>Channels:</strong></p>
            <p className="navbar-item">
              <a href="#"><i className="fa fa-video-camera"></i>&nbsp;Videos</a>
            </p>
            <p className="navbar-item">
              <a href="#"><i className="fa fa-camera"></i>&nbsp;Photos</a>
            </p>
            <p className="navbar-item">
              <a href="#"><i className="fa fa-comment"></i>&nbsp;Posts</a>
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
