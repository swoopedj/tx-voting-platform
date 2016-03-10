import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const inEditMode = createReducer(true, {
  SET_ENTRY_AS_CURRENT: () => false,
  REQUEST_ENTRY_INFO: () => true,
  REQUEST_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY_ERROR: () => true,
});

const isSaving = createReducer(true, {
  SET_ENTRY_AS_CURRENT: () => false,
  REQUEST_NEW_ENTRY: () => true,
  RECEIVE_NEW_ENTRY: () => false,
  RECEIVE_NEW_ENTRY_ERROR: () => false,
});

const isLoading = createReducer(false, {
  SET_ENTRY_AS_CURRENT: () => false,
  REQUEST_NEW_ENTRY: () => false,
  REQUEST_ENTRY_INFO: () => true,
  RECEIVE_ENTRY_INFO: () => false,
  RECEIVE_ENTRY_INFO_ERROR: () => false,
});

const error = createReducer(null, {
  REQUEST_ENTRY_INFO: () => null,
  RECEIVE_ENTRY_INFO: () => null,
  RECEIVE_ENTRY_INFO_ERROR: (state, action) => Immutable.fromJS(action.error),
  RECEIVE_NEW_ENTRY_ERROR: (state, action) => Immutable.fromJS(action.error),
});

const data = createReducer(Immutable.Map(), {
  SET_ENTRY_AS_CURRENT: (state, action) => {
    return Immutable.fromJS(action.entry);
  },
  RECEIVE_ENTRY_INFO: (state, action) => {
    return Immutable.fromJS(action.data);
  },
});

export const currentEntry = combineReducers({
  inEditMode,
  isSaving,
  isLoading,
  error,
  data,
});
