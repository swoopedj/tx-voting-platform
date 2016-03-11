const React = require('react');

const SubNav = () => {
  return (
    <div className="tabs">
      <div className="container">
        <ul>
          <li className="is-active"><a>Videos</a></li>
          <li><a>Posts</a></li>
          <li><a>Tweets</a></li>
          <li><a>Photos</a></li>
        </ul>
      </div>
    </div>
  );
};

module.exports = SubNav;
