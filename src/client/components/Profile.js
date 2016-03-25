import React from 'react';
import { Link } from 'react-router';

const Profile = ({ user = {}, entries, onLogoutClick }) => {
  const userData = user.data || {};
  return (
    <div>
      <div className="profile-header">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <img className="image is-64x64 is-rounded is-pulled-left" src={userData.photo} />
              <h1 className="title is-2">{userData.userName}</h1>
            </div>
            <div className="column is-5">
              <nav className="navbar">
                <div className="navbar-item is-text-centered">
                  <p className="heading">Entries</p>
                  <p className="title">3</p>
                </div>
                <div className="navbar-item is-text-centered">
                  <p className="heading">Total Views</p>
                  <p className="title">2,123</p>
                </div>
                <div className="navbar-item is-text-centered">
                  <p className="heading">Total Likes</p>
                  <p className="title">45</p>
                </div>
              </nav>
            </div>
            <div className="column is-3 is-text-right">
              <Link to="/" onClick={onLogoutClick} onclassName="button has-icon">Logout&nbsp;<i className="fa fa-sign-out"></i></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <h1 className="title">Entries</h1>
          <hr />
        </div>
      </div>
    </div>
  );
};

module.exports = Profile;
