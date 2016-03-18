/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { flashMessage }  = require(`${__client}/reducers/flashMessage`);
const entryActions = require(`${__client}/actionCreators/entries`);

const getMessage = (action, initialState) => {
  return flashMessage(initialState, action).toJS();
};

const assertErrorMessage = (initialState, message, action) => {
  expect(getMessage(action, initialState)).to.deep.equal({
    type: 'warning',
    message,
    isVisible: true,
    createdAt: 1000,
  });
};

const assertSuccessMessage = (initialState, message, action) => {
  expect(getMessage(action, initialState)).to.deep.equal({
    type: 'success',
    message,
    isVisible: true,
    createdAt: 1000,
  });
};

describe('The flash message reducer', () => {
  describe('generates error messages on', () => {
    const initialState = Immutable.fromJS({});
    const error = { message: 'test' };
    it('RECEIVE_NEW_ENTRY_ERROR', () => {
      assertErrorMessage(
        initialState,
        'Failed to create new entry',
        entryActions.receiveNewEntryError(error, 1000)
      );
    });
    it('RECEIVE_ENTRIES', () => {
      assertErrorMessage(
        initialState,
        'Something went wrong while fetching entries',
        entryActions.receiveEntriesError(error, 1000)
      );
    });
    it('RECEIVE_ENTRY_INFO_ERROR', () => {
      const youtubeError = {
        message: 'YouTube url: google.com is invalid',
      };
      assertErrorMessage(
        initialState,
        'YouTube url: google.com is invalid',
        entryActions.receiveEntryInfoError(youtubeError, 1000)
      );
    });
  });
 
  describe('generates success messages on', () => {
    const initialState = Immutable.fromJS({});
    it('RECEIVE_NEW_ENTRY', () => {
      assertSuccessMessage(
        initialState,
        'Entry created successfully!',
        entryActions.receiveNewEntry(1000),
      );
    });
  });

});
