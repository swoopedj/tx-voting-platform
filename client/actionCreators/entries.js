const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Entry = require('../models/entry');
const { push } = require('react-router-redux');

function requestEntries() {
  return {
    type: 'REQUEST_ENTRIES',
  };
}

function receiveEntries(links) {
  return {
    type: 'RECEIVE_ENTRIES',
    links,
  };
}

function requestEntryInfo(url) {
  return {
    type: 'REQUEST_ENTRY_INFO',
    url,
  };
}

function receiveEntryInfo(data) {
  return {
    type: 'RECEIVE_ENTRY_INFO',
    data,
  };
}

function receiveEntryInfoError(error) {
  return {
    type: 'RECEIVE_ENTRY_INFO_ERROR',
    error,
  };
}

function receiveNewEntryError(error) {
  return {
    type: 'RECEIVE_NEW_ENTRY_ERROR',
    error,
  };
}

function receiveEntriesError(error) {
  return {
    type: 'RECEIVE_ENTRIES_ERROR',
    error,
  };
}

function requestNewEntry(link) {
  return {
    type: 'REQUEST_NEW_ENTRY',
    link,
  };
}

function receiveNewEntry() {
  return {
    type: 'RECEIVE_NEW_ENTRY',
  };
}

function setEntryAsCurrent(entry) {
  return {
    type: 'SET_ENTRY_AS_CURRENT',
    entry,
  };
}

function fetchEntries() {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.fetch(),
    onRequest: () => requestEntries(),
    onSuccess: (links) => receiveEntries(links),
    onError: (error) => receiveEntriesError(error),
  });
}

function getEntryInfo(url) {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.getInfo(url),
    onRequest: () => requestEntryInfo(url),
    onSuccess: (info) => {
      return [
        receiveEntryInfo(info),
        push('/entry/yt/create'),
      ];
    },
    onError: (error) => receiveEntryInfoError(error),
  });
}

function addEntry(link) {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.create(link),
    onRequest: () => requestNewEntry(),
    onSuccess: () => receiveNewEntry(),
    onError: (error) => receiveNewEntryError(error),
  });
}

function navigateToEntry(id) {
  return (dispatch) => {
    dispatch(push(`/entry/${id}`));
  };
}

module.exports = {
  setEntryAsCurrent,
  navigateToEntry,
  fetchEntries,
  requestEntries,
  addEntry,
  receiveEntriesError,
  receiveEntries,
  requestEntryInfo,
  requestNewEntry,
  receiveNewEntry,
  receiveNewEntryError,
  receiveEntryInfoError,
  receiveEntryInfo,
  getEntryInfo,
};
