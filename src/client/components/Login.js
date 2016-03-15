import React from 'react';

const Login = () => {
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
            <a href="#" className="button is-large is-danger">
              <i className="fa fa-google"></i>
              Login With Google
            </a>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

module.exports = Login;
