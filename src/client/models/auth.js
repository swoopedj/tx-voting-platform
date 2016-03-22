const OAuth = require('oauthio-web').OAuth;
const User = require('./user');

const Auth = {
  initialize: () => {
    // this is inside of this init function so that it doesn't run in our tests
    OAuth.initialize('-tZdOj848DFm54bSrDZeO-gmRkc');
  },
  loginThroughFacebook: () => {
    return new Promise((resolve, reject) => {
      OAuth.popup('facebook', { cache: true })
      .then(result => {
        result.me().done(user => resolve(user));
      })
      .fail(error => reject(error));
    });
  },
  convertAuthUserToDatabaseUser: (user) => {
    return {
      photo: user.avatar,
      email: user.email,
      authID: user.id,
      isAdmin: false,
      userName: user.name,
    };
  },
  cacheUser: (user) => {
    localStorage.setItem('db_user', JSON.stringify(user));
    return user;
  },
  clearCache: () => {
    localStorage.setItem('db_user', null);
  },
  login: () => {
    return Auth.loginThroughFacebook()
      .then(Auth.convertAuthUserToDatabaseUser)
      .then(user => User.insertOrUpdate(user.authID, user)).then(Auth.cacheUser);
  },
  isLoggedIn: () => {
    return OAuth.create('facebook') !== null;
  },
  logout: () => {
    Auth.clearCache();
    return OAuth.clearCache('facebook');
  },
  getUserData: () => {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem('db_user')));
    });
  },
};

Auth.initialize();

module.exports = Auth;
