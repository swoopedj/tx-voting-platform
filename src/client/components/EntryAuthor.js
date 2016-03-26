const React = require('react');
const Auth = require('./Auth');
import { Link } from 'react-router';

const EntryAuthor = ({ user = {} }) => {
  const {
    photo = "http://placehold.it/64x64&text=C",
    userName = "",
    authID = "",
  } = user;
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32 avatar">
          <Link to={`/profile/${authID}`} ><img className="is-round" src={photo} alt="Image" /></Link>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-5"><Link to={`/profile/${authID}`} >{userName}</Link></p>
      </div>
    </div>
  );
};

module.exports = EntryAuthor;
