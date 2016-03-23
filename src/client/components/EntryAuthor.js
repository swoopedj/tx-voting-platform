const React = require('react');
const Auth = require('./Auth');

const EntryAuthor = ({ user }) => {
  const photo = user ? user.photo : "http://placehold.it/64x64&text=C";
  const userName = user ? user.userName : "";
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32 avatar">
          <a href="#"><img className="is-round" src={photo} alt="Image" /></a>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-5"><a href="#">{userName}</a></p>
      </div>
    </div>
  );
};

module.exports = EntryAuthor;
