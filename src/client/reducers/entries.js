import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';
import { info } from './entryInfo';

const items = createReducer(Immutable.fromJS([]), {
  RECEIVE_ENTRIES: (state, action) => {
    return state.concat(Immutable.fromJS(action.entries));
  },
});

const isFetching = createReducer(false, {
  REQUEST_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY_ERROR: () => false,
  REQUEST_ENTRIES: () => true,
  RECEIVE_ENTRIES: () => false,
});

const isAddingNew = createReducer(false, {
  REQUEST_NEW_ENTRY: () => true,
  RECEIVE_NEW_ENTRY: () => false,
});

const error = createReducer(null, {
  REQUEST_ENTRIES: () => null,
  RECEIVE_ENTRIES: () => null,
  RECEIVE_ENTRIES_ERROR: (state, action) => Immutable.fromJS(action.error),
  RECEIVE_NEW_ENTRY_ERROR: (state, action) => Immutable.fromJS({ message: action.error.message });
  },
});

export const entries = combineReducers({
  isAddingNew,
  info,
  items,
  isFetching,
  error,
});
