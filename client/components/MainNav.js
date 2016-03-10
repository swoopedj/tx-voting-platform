const React = require('react');
const Auth = require('./Auth');

const HeaderNav = () => {
  return (
    <div className="header-right header-menu">
      <span className="header-item">
        <a href="#">About</a>
      </span>
      <span className="header-item">
        <a href="#">Login</a>
      </span>
      <Auth />
    </div>
  );
};

module.exports = HeaderNav;
