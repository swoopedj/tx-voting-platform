import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const items = createReducer(Immutable.fromJS([]), {
  RECEIVE_LINKS: (state, action) => {
    return Immutable.fromJS(action.links);
  },
});

const isLoading = createReducer(false, {
  REQUEST_LINKS: () => true,
  RECEIVE_LINKS: () => false,
});

const error = createReducer(null, {
  REQUEST_LINKS: () => null,
  RECEIVE_LINKS: () => null,
  RECEIVE_LINKS_ERROR: (state, action) => Immutable.fromJS(action.error),
});

export const links = combineReducers({
  items,
  isLoading,
  error,
});
