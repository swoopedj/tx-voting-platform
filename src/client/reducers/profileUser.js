import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const data = createReducer(Immutable.fromJS({}), {
  RECEIVE_USER: (state, action) => Immutable.fromJS(action.user),
  REQUEST_USER: (state, action) => Immutable.fromJS({}),
});

const isFetching = createReducer(false, {
  REQUEST_USER: () => true,
});


const error = createReducer(null, {
  RECEIVE_USER_ERROR: (state, action) => Immutable.fromJS(action.error),
});

export const profileUser = combineReducers({
  isFetching,
  data,
  error,
});
