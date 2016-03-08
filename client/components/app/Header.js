const React = require('react');
const HeaderNav = require('./HeaderNav');

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Branding */}
        <div className="header-left">
          <a className="header-item" href="#">Texans Vote</a>
        </div>
        {/* Mobile menu */}
        <span className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        {/* Main navigation */}
        <HeaderNav />
      </div>
    </header>
  );
};

module.exports = Header;
