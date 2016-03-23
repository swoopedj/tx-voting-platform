/* eslint max-len: [0] */
import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <nav className="navbar">
                <p className="navbar-item is-text-centered">
                  <Link to="/" className="link is-info">Home</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/entries" className="link is-info">Entries</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/entry/new" className="link is-info">Submit&nbsp;Your&nbsp;Entry</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/entries" className="link is-info">Blog</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/about" className="link is-info">Contest&nbsp;Rules</Link>
                </p>
                <p className="navbar-item is-text-centered">
                  <Link to="/privacy" className="link is-info">Contact</Link>
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
