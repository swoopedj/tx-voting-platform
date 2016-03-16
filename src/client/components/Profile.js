import React from 'react';

const Profile = () => {
  return (
    <div className="columns">
      <div className="column is-quarter">
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src="https://avatars2.githubusercontent.com/u/1420404?v=3&s=400" />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-5">Clay Branch</p>
          </div>
        </div>
      </div>
      <div className="column">
        <h1 className="title">Submissions</h1>
        <hr />
      </div>
    </div>
  );
};

module.exports = Profile;
