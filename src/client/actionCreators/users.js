const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Auth = require('../models/auth');
const User = require('../models/user');
const { push } = require('react-router-redux');
const Immutable = require('immutable');
const actions = {};

actions.receiveLoggedInUser = (user) => ({
  type: 'RECEIVE_LOGGED_IN_USER',
  user,
});

actions.requestLoggedInUser = () => ({
  type: 'REQUEST_LOGGED_IN_USER',
});

actions.receiveLoggedInStatus = (status) => ({
  type: 'RECEIVE_LOGGED_IN_STATUS',
  status,
});

actions.receiveLoggedInUserError = (error) => ({
  type: 'RECEIVE_LOGGED_IN_USER_ERROR',
  error,
});

actions.clearUserData = () => ({
  type: 'CLEAR_USER_DATA',
});

actions.logOut = () => {
  return dispatch => {
    Auth.logout();
    dispatch(actions.clearUserData());
  };
};

actions.login = () => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Auth.login(),
    onRequest: () => actions.requestLoggedInUser(),
    onSuccess: (user) => {
      return [
        actions.receiveLoggedInUser(user),
        push('/'),
      ];
    },
    onError: (error) => actions.receiveLoggedInUserError(error),
  });
};

actions.getCachedUser = () => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Auth.getUserData(),
    onRequest: () => actions.requestLoggedInUser(),
    onSuccess: (user) => actions.receiveLoggedInUser(user),
    onError: (error) => actions.receiveLoggedInUserError(error),
  });
};

actions.populateUserData = () => {
  return (dispatch, getState) => {
    const user = getState().get('user');
    if (user.get('isPopulated')) return Promise.resolve(user.get('data').toJS());
    const isLoggedIn = Auth.isLoggedIn();
    dispatch(actions.receiveLoggedInStatus(isLoggedIn));
    if (!isLoggedIn) {
      dispatch(push('/login'));
      return Promise.resolve({});
    }
    return dispatch(actions.getCachedUser());
  };
};


module.exports = actions;
