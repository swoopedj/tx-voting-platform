import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const items = createReducer(Immutable.fromJS([]), {
  RECEIVE_ENTRIES: (state, action) => {
    return Immutable.fromJS(action.links);
  },
});

const isLoading = createReducer(false, {
  REQUEST_ENTRIES: () => true,
  RECEIVE_ENTRIES: () => false,
});

const error = createReducer(null, {
  REQUEST_ENTRIES: () => null,
  RECEIVE_ENTRIES: () => null,
  RECEIVE_ENTRIES_ERROR: (state, action) => Immutable.fromJS(action.error),
});

export const entries = combineReducers({
  items,
  isLoading,
  error,
});
