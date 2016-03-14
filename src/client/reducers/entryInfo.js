import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const data = createReducer(Immutable.fromJS({}), {
  RECEIVE_ENTRY_INFO: (state, action) => Immutable.fromJS(action.data),
});

const isFetching = createReducer(false, {
  REQUEST_ENTRY_INFO: () => true,
  RECEIVE_ENTRY_INFO: () => false,
  RECEIVE_ENTRY_INFO_ERROR: () => false,
});

const error = createReducer(null, {
  REQUEST_ENTRY_INFO: () => null,
  RECEIVE_ENTRY_INFO: () => null,
  RECEIVE_ENTRY_INFO_ERROR: (state, action) => Immutable.fromJS(action.error),
});

export const info = combineReducers({
  data,
  isFetching,
  error,
});
