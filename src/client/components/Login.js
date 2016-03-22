import React, { Component, PropTypes } from 'react';

const Login = ({ onLoginClick }) => {
  return (
    <div className="columns">
      <div className="column is-half is-offset-quarter">
        <div className="box is-text-centered">
          <h1 className="title">Login</h1>
          <hr />
          <p className="is-text-large">
            Login with your <strong>Google</strong> account<br />to submit your entry.
          </p>
          <br />
          <p>
            <button onClick={onLoginClick} href="#" className="button is-large is-danger">
              <i className="fa fa-google"></i>
              Login With Google
            </button>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

module.exports = Login;
