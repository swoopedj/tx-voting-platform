const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Entry = require('../models/entry');
const { push } = require('react-router-redux');
const Immutable = require('immutable');
const actions = {};
const sweetAlert = require('sweetalert');

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

actions.requestUpdatedEntry = (id, fields, time = Date.now()) => ({
  type: 'REQUEST_UPDATED_ENTRY',
  time,
  id,
  fields,
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

actions.requestEntryDelete = (time = Date.now()) => ({
  type: 'REQUEST_ENTRY_DELETE',
  time,
});

actions.receiveEntryDelete = (id, time = Date.now()) => ({
  type: 'RECEIVE_ENTRY_DELETE',
  id,
  time,
});

actions.receiveEntryDeleteError = (time = Date.now()) => ({
  type: 'RECEIVE_ENTRY_DELETE_ERROR',
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
  const itemCount = state.get('itemsByID').size;
  if (state.get('isFetching')) return false;
  // if there are no items always fetch
  if (itemCount === 0) return true;
  // if no id is provided
  // only fetch if the array is empty
  if (requiredID === undefined) return itemCount === 0;
  // otherwise, check whether the required id is in the array
  return !state
    .getIn(['itemsByID', requiredID]);
};

actions.fetchIfNeeded = (requiredID) => {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetch(requiredID, state.get('entries'))) return dispatch(actions.fetchEntries());
    return Promise.resolve(state.getIn('entries', 'itemsByID'));
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
      actions.requestUpdatedEntry(id, fields),
    ],
    onSuccess: (updatedEntry) => actions.receiveUpdatedEntry(updatedEntry),
    onError: (error) => [
      actions.navigateToEntryEdit(id),
      actions.receiveUpdatedEntryError(error),
    ],
  });
};

actions.addEntry = (entry, userID) => {
  const newEntry = {
    userID,
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

actions.deleteEntry = entryID => {
  return dispatch => getAsyncAction({
    dispatch,
    request: () => Entry.delete(entryID),
    onRequest: () => [
      push('/'),
      actions.requestEntryDelete(),
    ],
    onSuccess: () => actions.receiveEntryDelete(entryID),
    onError: (error) => [
      push('/'),
      actions.navigateToEntryEdit(entryID),
      actions.receiveEntryDeleteError(error),
    ],
  });
};

actions.tryToDeleteEntry = entryID => {
  return dispatch => {
    sweetAlert(
      {
        title: 'Are you sure?',
        text: 'You will not be able to recover this entry',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        closeOnConfirm: true,
        closeOnCancel: true,
      },
      (isConfirm) => {
        if (isConfirm) {
          dispatch(actions.deleteEntry(entryID));
        }
      },
    );
  };
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

actions.addEntryAndRedirect = (entry, userID, path) => {
  return dispatch => {
    return dispatch(actions.addEntry(entry, userID))
    .then(dispatch(actions.navigate(path)));
  };
};

actions.findEntryByID = (state, id) => {
  return state.getIn(['entries', 'itemsByID', id]) || Immutable.fromJS({});
};

actions.navigateToEntry = (id) => {
  return push(`/entry/yt/${id}`);
};

actions.navigateToEntryEdit = (id) => {
  return push(`/entry/yt/edit/${id}`);
};

const getCurrentEntry = (isCreatingNew, state, id) => {
  if (isCreatingNew) return state.getIn(['entries', 'info', 'data']);
  return actions.findEntryByID(state, id);
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
  const user = state.getIn(['user', 'data']);
  return {
    id,
    isCreatingNew,
    inEditMode,
    isWorking: state.getIn(['entries', 'isWorking']),
    entry,
    inputFields,
    user: user ? user.toJS() : {},
  };
};

module.exports = actions;
