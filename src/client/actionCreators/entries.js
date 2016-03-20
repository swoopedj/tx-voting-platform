const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Entry = require('../models/entry');
const { push } = require('react-router-redux');
const Immutable = require('immutable');
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

actions.changeEntryInputField = (key, value) => ({
  type: 'CHANGE_ENTRY_INPUT_FIELD',
  key,
  value,
});


actions.receiveEntryInfo = (data) => ({
  type: 'RECEIVE_ENTRY_INFO',
  data,
});

actions.receiveEntryInfoError = (error, time = Date.now()) => ({
  type: 'RECEIVE_ENTRY_INFO_ERROR',
  error,
  time,
});

actions.receiveNewEntryError = (error, time = Date.now()) => ({
  type: 'RECEIVE_NEW_ENTRY_ERROR',
  error,
  time,
});

actions.receiveEntriesError = (error, time = Date.now()) => ({
  type: 'RECEIVE_ENTRIES_ERROR',
  error,
  time,
});

actions.requestNewEntry = (link) => ({
  type: 'REQUEST_NEW_ENTRY',
  link,
});

actions.receiveNewEntry = (time = Date.now()) => ({
  type: 'RECEIVE_NEW_ENTRY',
  time,
});

actions.requestUpdatedEntry = (time = Date.now()) => ({
  type: 'REQUEST_UPDATED_ENTRY',
  time,
});

actions.receiveUpdatedEntry = (entry, time = Date.now()) => ({
  type: 'RECEIVE_UPDATED_ENTRY',
  entry,
  time,
});

actions.receiveUpdatedEntryError = (error, time = Date.now()) => ({
  type: 'RECEIVE_UPDATED_ENTRY_ERROR',
  error,
  time,
});

actions.fetchEntries = () => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.fetch(),
    onRequest: () => actions.requestEntries(),
    onSuccess: (entries) => actions.receiveEntries(entries),
    onError: (error) => actions.receiveEntriesError(error),
  });
};

const shouldFetch = (requiredID, state) => {
  const itemCount = state.get('items').size;
  if (state.get('isFetching')) return false;
  // if there are no items always fetch
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

actions.updateEntry = (id, fields) => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.update(id, fields),
    onRequest: () => [
      actions.navigateToEntry(id),
      actions.requestUpdatedEntry(),
    ],
    onSuccess: (updatedEntry) => actions.receiveUpdatedEntry(updatedEntry),
    onError: (error) => [
      actions.navigateToEntryEdit(id),
      actions.receiveUpdatedEntryError(error),
    ],
  });
};

actions.addEntry = (entry) => {
  const newEntry = {
    userID: 1,
    sortMetric: 10,
    ...entry,
  };
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.create(newEntry),
    onRequest: () => actions.requestNewEntry(),
    onSuccess: () => actions.receiveNewEntry(),
    onError: (error) => actions.receiveNewEntryError(error),
  });
};

// expects an immutable object representing the entry
actions.mixInputFieldsIntoEntry = (entry, fields) => {
  return entry.withMutations(entryMap => {
    Object.keys(fields).map(key => {
      entryMap.set(key, fields[key]);
    });
  });
};

actions.navigate = (path) => {
  return dispatch => {
    dispatch(push(path));
  };
};

actions.addEntryAndRedirect = (entry, path) => {
  return dispatch => {
    return dispatch(actions.addEntry(entry))
    .then(dispatch(actions.navigate(path)));
  };
};

actions.findEntryByID = (state, id) => {
  return state.get('items')
  .find(item => item.get('id') === id) || Immutable.fromJS({});
};

actions.navigateToEntry = (id) => {
  return push(`/entry/yt/${id}`);
};

actions.navigateToEntryEdit = (id) => {
  return push(`/entry/yt/edit/${id}`);
};

const getCurrentEntry = (isCreatingNew, state, id) => {
  if (isCreatingNew) return state.getIn(['entries', 'info', 'data']);
  return actions.findEntryByID(state.get('entries'), id);
};

const getEntryWithInputFieldsMixedIn = (isCreatingNew, state, id, inputFields) => {
  const entry = getCurrentEntry(isCreatingNew, state, id);
  return actions.mixInputFieldsIntoEntry(entry, inputFields);
};

actions.getEntryViewProps = (state, routeParams) => {
  const isCreatingNew = routeParams.id === 'create';
  const id = parseInt(routeParams.id, 0);
  const inEditMode = routeParams.is_edit === 'edit' || isCreatingNew;
  const inputFields = state.getIn(['entries', 'inputFields']).toJS();
  const entry = getEntryWithInputFieldsMixedIn(isCreatingNew, state, id, inputFields).toJS();
  return {
    id,
    isCreatingNew,
    inEditMode,
    isWorking: state.getIn(['entries', 'isWorking']),
    entry,
    inputFields,
  };
};

module.exports = actions;
