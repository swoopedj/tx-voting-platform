import Immutable from 'immutable';
import { createReducer } from '../lib/redux-helpers';
import { combineReducers } from 'redux-immutable';

const inEditMode = createReducer(true, {
  REQUEST_LINK_INFO: () => true,
  REQUEST_NEW_LINK: () => false,
  RECEIVE_NEW_LINK: () => false,
  RECEIVE_NEW_LINK_ERROR: () => true,
});

const isSaving = createReducer(true, {
  REQUEST_NEW_LINK: () => true,
  RECEIVE_NEW_LINK: () => false,
  RECEIVE_NEW_LINK_ERROR: () => false,
});

const isLoading = createReducer(false, {
  REQUEST_NEW_LINK: () => false,
  REQUEST_LINK_INFO: () => true,
  RECEIVE_LINK_INFO: () => false,
  RECEIVE_LINK_INFO_ERROR: () => false,
});

const error = createReducer(null, {
  REQUEST_LINK_INFO: () => null,
  RECEIVE_LINK_INFO: () => null,
  RECEIVE_LINK_INFO_ERROR: (state, action) => Immutable.fromJS(action.error),
  RECEIVE_NEW_LINK_ERROR: (state, action) => Immutable.fromJS(action.error),
});

const data = createReducer(Immutable.Map(), {
  RECEIVE_LINK_INFO: (state, action) => {
    return Immutable.fromJS(action.data);
  },
});

export const currentLink = combineReducers({
  inEditMode,
  isSaving,
  isLoading,
  error,
  data,
});
