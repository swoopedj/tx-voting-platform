import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const data = createReducer(Immutable.fromJS({}), {
  CLEAR_USER_DATA: () => Immutable.fromJS({}),
  REQUEST_LOGGED_IN_USER: (state, action) => {
    return Immutable.fromJS({});
  },
  RECEIVE_LOGGED_IN_USER: (state, action) => {
    return Immutable.fromJS(action.user);
  },
});

const isPopulated = createReducer(false, {
  CLEAR_USER_DATA: () => false,
  RECEIVE_LOGGED_IN_USER: () => true,
  RECEIVE_LOGGED_IN_USER_ERROR: () => false,
});

const isFetching = createReducer(false, {
  CLEAR_USER_DATA: () => false,
  REQUEST_LOGGED_IN_USER: () => true,
  RECEIVE_LOGGED_IN_USER: () => false,
  RECEIVE_LOGGED_IN_USER_ERROR: () => false,
});

const isLoggedIn = createReducer(false, {
  CLEAR_USER_DATA: () => false,
  RECEIVE_LOGGED_IN_STATUS: (state, action) => action.status,
  RECEIVE_LOGGED_IN_USER: () => true,
});

const error = createReducer(null, {
  CLEAR_USER_DATA: () => null,
  RECEIVE_LOGGED_IN_USER_ERROR: (state, action) => Immutable.fromJS(action.error),
});


export const user = combineReducers({
  data,
  isFetching,
  isLoggedIn,
  isPopulated,
  error,
});
