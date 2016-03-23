import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';
import { info } from './entryInfo';

const itemsByID = createReducer(Immutable.fromJS({}), {
  RECEIVE_ENTRIES: (state, action) => {
    return state.withMutations(itemsByID => {
      action.entries.map(entry => itemsByID.set(entry.id, Immutable.fromJS(entry)));
    });
  },
  REQUEST_UPDATED_ENTRY: (state, action) => {
    const updatedEntry = state.get(action.id).withMutations(entry => {
      Object.keys(action.fields).map(key => entry.set(key, action.fields[key]));
    });
    console.log(updatedEntry);
    return state.set(action.id, updatedEntry);
  },
  RECEIVE_UPDATED_ENTRY: (state, action) => {
    return state.set(action.entry.id, Immutable.fromJS(action.entry));
  },
});

const isFetching = createReducer(false, {
  REQUEST_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY_ERROR: () => false,
  REQUEST_ENTRIES: () => true,
  RECEIVE_ENTRIES: () => false,
});

const isWorking = createReducer(false, {
  REQUEST_NEW_ENTRY: () => true,
  RECEIVE_NEW_ENTRY: () => false,
});

const error = createReducer(null, {
  REQUEST_ENTRIES: () => null,
  RECEIVE_ENTRIES: () => null,
  RECEIVE_ENTRIES_ERROR: (state, action) => Immutable.fromJS(action.error),
  RECEIVE_NEW_ENTRY_ERROR: (state, action) => Immutable.fromJS({ message: action.error.message }),
});

const inputFields = createReducer(Immutable.fromJS({}), {
  RECEIVE_UPDATED_ENTRY: () => Immutable.fromJS({}),
  RECEIVE_NEW_ENTRY: () => Immutable.fromJS({}),
  CHANGE_ENTRY_INPUT_FIELD: (state, action) => state.set(action.key, action.value),
});

export const entries = combineReducers({
  isWorking,
  info,
  itemsByID,
  isFetching,
  error,
  inputFields,
});
