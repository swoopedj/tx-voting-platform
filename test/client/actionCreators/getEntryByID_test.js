/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const actions = require(`${__client}/actionCreators/entries`);

describe('The getEntryByID action', () => {
  const initialState = {
    entries: {
      itemsByID: {},
    },
  };
  it('gets the state for a entry with the matching id', () => {
    const state = Immutable.fromJS(initialState);
    const testEntry = {
      test: 1,
    };
    const updatedState = state.setIn(['entries', 'itemsByID', 1], Immutable.fromJS(testEntry));
    const foundEntry = actions.findEntryByID(updatedState, 1).toJS();
    expect(foundEntry).to.deep.equal(testEntry);
  });
});

