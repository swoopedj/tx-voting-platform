const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Link = require('../models/link');

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

function fetchEntries() {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Link.fetch(),
    onRequest: () => requestEntries(),
    onSuccess: (links) => receiveEntries(links),
    onError: (error) => receiveEntriesError(error),
  });
}

function getEntryInfo(url) {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Link.getInfo(url),
    onRequest: () => requestEntryInfo(url),
    onSuccess: (info) => receiveEntryInfo(info),
    onError: (error) => receiveEntryInfoError(error),
  });
}

function addEntry(link) {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Link.create(link),
    onRequest: () => requestNewEntry(),
    onSuccess: () => receiveNewEntry(),
    onError: (error) => receiveNewEntryError(error),
  });
}


module.exports = {
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
