import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-quarter">
              <nav className="navbar">
                <p className="navbar-item is-text-centered">
                  <Link to="/" className="link is-info">Home</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/entries" className="link is-info">Entries</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/about" className="link is-info">About</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/privacy" className="link is-info">Privacy</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/tos" className="link is-info">Terms</Link>
                </p>
              </nav>
              <p className="is-text-centered">
                <Link to="/" className="logo logo-footer">Texans<span className="thin">Vote</span></Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

module.exports = Footer;
