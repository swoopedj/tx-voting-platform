/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { flashMessage }  = require(`${__client}/reducers/flashMessage`);
const entryActions = require(`${__client}/actionCreators/entries`);

describe('The flash message reducer', () => {
  const initialState = Immutable.fromJS({});
  const error = { message: 'test', time: 1000 };
  const getMessage = (action) => {
    return flashMessage(initialState, action).toJS();
  };
  describe('generates error messages on', () => {
    it.only('RECEIVE_NEW_ENTRY_ERROR', () => {
      expect(getMessage(entryActions.receiveNewEntryError(error)))
        .to.deep.equal({
          type: 'warning',
          message: 'Failed to create new entry',
          createdAt: 1000,
        });
    });
  });

  it('clears message when clear message is called', () => {
    const state = flashMessage(
        Immutable.fromJS({ message: 'test' }),
        actions.clearFlashMessage()
    ).toJS();
    expect(state).to.deep.equal({});
  });
});
