const React = require('react');

const HeaderNav = () => {
  return (
    <div className="header-right header-menu">
      <span className="header-item">
        <a href="#">About</a>
      </span>
      <span className="header-item">
        <a href="#">Login</a>
      </span>
      <span className="header-item">
        <a className="button" href="#">Sign Up</a>
      </span>
    </div>
  );
};

module.exports = HeaderNav;
