const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Entry = require('../models/entry');
const { push } = require('react-router-redux');

const actions = {};

actions.requestEntries = () => ({
  type: 'REQUEST_ENTRIES',
});

actions.receiveEntries = (entries) => ({
  type: 'RECEIVE_ENTRIES',
  entries,
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

actions.setEntryAsCurrent = (entry) => ({
  type: 'SET_ENTRY_AS_CURRENT',
  entry,
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

actions.addEntry = (link) => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.create(link),
    onRequest: () => actions.requestNewEntry(),
    onSuccess: () => {
      return [
        actions.receiveNewEntry(),
        dispatch(push('/')),
      ];
    },
    onError: (error) => actions.receiveNewEntryError(error),
  });
};

actions.navigateToEntry = (id) => {
  return (dispatch) => {
    dispatch(push(`/entry/${id}`));
  };
};

module.exports = actions;
