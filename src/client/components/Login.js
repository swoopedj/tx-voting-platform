import React, { Component, PropTypes } from 'react';

const Login = ({ onLoginClick }) => {
  return (
    <div className="columns">
      <div className="column is-half is-offset-quarter">
        <div className="box is-text-centered">
          <h1 className="title">Login</h1>
          <hr />
          <p className="is-text-large">
            Login with your <strong>Facebook</strong> account<br />to join and submit your entry.
          </p>
          <br />
          <p>
            <button onClick={onLoginClick} href="#" className="button is-large is-facebook">
              <i className="fa fa-facebook"></i>
              Login With Facebook
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
