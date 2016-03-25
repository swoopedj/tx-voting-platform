import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const itemsByID = createReducer(Immutable.fromJS({}), {
  RECEIVE_ENTRIES_FOR_USER: (state, action) => {
    return state.withMutations(items => {
      action.entries.map(entry => items.set(entry.id, Immutable.fromJS(entry)));
    });
  },
});

const isFetching = createReducer(false, {
  
});


const error = createReducer(null, {
});

export const entriesForUser = combineReducers({
  itemsByID,
  isFetching,
  error,
});
