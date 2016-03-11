const React = require('react');
const Auth = require('./Auth');

const HeaderNav = () => {
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32 avatar">
          <a href="#"><img className="is-round" src="http://placehold.it/64x64&text=C" alt="Image" /></a>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-5"><a href="#">Clay Branch</a></p>
      </div>
    </div>
  );
};

module.exports = HeaderNav;
