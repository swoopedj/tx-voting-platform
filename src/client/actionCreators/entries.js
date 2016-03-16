const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Entry = require('../models/entry');
const { push } = require('react-router-redux');
const Immutable = require('immutable');

const actions = {};

actions.requestEntries = () => ({
  type: 'REQUEST_ENTRIES',
});

actions.receiveEntries = (response) => ({
  type: 'RECEIVE_ENTRIES',
  entries: response.entries || [],
});

actions.requestEntryInfo = (url) => ({
  type: 'REQUEST_ENTRY_INFO',
  url,
});

actions.receiveEntryInfo = (data) => ({
  type: 'RECEIVE_ENTRY_INFO',
  data,
});

actions.receiveEntryInfoError = (error) => ({
  type: 'RECEIVE_ENTRY_INFO_ERROR',
  error,
});

actions.receiveNewEntryError = (error) => ({
  type: 'RECEIVE_NEW_ENTRY_ERROR',
  error,
});

actions.receiveEntriesError = (error) => ({
  type: 'RECEIVE_ENTRIES_ERROR',
  error,
});

actions.requestNewEntry = (link) => ({
  type: 'REQUEST_NEW_ENTRY',
  link,
});

actions.receiveNewEntry = () => ({
  type: 'RECEIVE_NEW_ENTRY',
});

actions.fetchEntries = () => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.fetch(),
    onRequest: () => actions.requestEntries(),
    onSuccess: (links) => actions.receiveEntries(links),
    onError: (error) => actions.receiveEntriesError(error),
  });
};

const shouldFetch = (requiredID, state) => {
  const itemCount = state.get('items').size;
  if (state.get('isFetching')) return false;
  // if there are no always fetch
  if (itemCount === 0) return true;
  // if no id is provided
  // only fetch if the array is empty
  if (requiredID === undefined) return itemCount === 0;
  // otherwise, check whether the required id is in the array
  return !state
    .get('items')
    .find(item => item.get('id') === requiredID);
};

actions.fetchIfNeeded = (requiredID) => {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetch(requiredID, state.get('entries'))) return dispatch(actions.fetchEntries());
    return Promise.resolve(state.getIn('entries', 'items'));
  };
};

actions.getEntryInfo = (url) => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.getInfo(url),
    onRequest: () => actions.requestEntryInfo(url),
    onSuccess: (info) => {
      return [
        actions.receiveEntryInfo(info),
        push('/entry/yt/create'),
      ];
    },
    onError: (error) => actions.receiveEntryInfoError(error),
  });
};

actions.addEntry = (entry) => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.create(entry),
    onRequest: () => actions.requestNewEntry(),
    onSuccess: () => {
      return [
        actions.receiveNewEntry(),
        push('/'),
      ];
    },
    onError: (error) => actions.receiveNewEntryError(error),
  });
};

actions.findEntryByID = (state, id) => {
  return state.get('items')
  .find(item => item.get('id') === id) || Immutable.fromJS({});
};

actions.navigateToEntry = (id) => {
  return (dispatch) => {
    dispatch(push(`/entry/${id}`));
  };
};

module.exports = actions;
