const React = require('react');
const MainNav = require('./MainNav');
const SubNav = require('./SubNav');

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          {/* Branding */}
          <div className="header-left">
            <a className="header-item logo" href="/">Texans<span className="thin">Vote</span></a>
          </div>
          {/* Mobile menu */}
          <span className="header-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          {/* Main navigation */}
          <MainNav />
        </div>
      </header>
      <SubNav />
    </div>
  );
};

module.exports = Header;
