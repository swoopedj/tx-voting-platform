import React from 'react';
import { Link } from 'react-router';
import numeral from 'numeral';
const EntryCard = require('./EntryCard');

const Profile = ({ user = {}, entries, onLogoutClick, userStats }) => {
  return (
    <div>
      <div className="profile-header">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <img className="image is-64x64 is-rounded is-pulled-left" src={user.photo} />
              <h1 className="title is-2">{user.userName}</h1>
            </div>
            <div className="column is-5">
              <nav className="navbar">
                <div className="navbar-item is-text-centered">
                  <p className="heading">Entries</p>
                  <p className="title">{entries.length}</p>
                </div>
                <div className="navbar-item is-text-centered">
                  <p className="heading">Total Views</p>
                  <p className="title">{numeral(userStats.views).format('0,0')}</p>
                </div>
                <div className="navbar-item is-text-centered">
                  <p className="heading">Total Likes</p>
                  <p className="title">{numeral(userStats.likes).format('0,0')}</p>
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
          <div className="columns is-multiline">
            { entries.map(entry =>
              <EntryCard
                key={entry.id}
                entry={entry}
                // onClick={(event) => onCardClick(event, entry)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Profile;
