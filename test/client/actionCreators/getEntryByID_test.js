/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const actions = require(`${__client}/actionCreators/entries`);

describe('The getEntryByID action', () => {
  const initialState = {
    items: [
      {
        id: 1,
        title: 'one',
      },
      {
        id: 2,
        title: 'two',
      },
    ],
  };
  it('gets the state for a entry with the matching id', () => {
    const state = Immutable.fromJS(initialState);
    const foundEntry = actions.findEntryByID(state, 1).toJS();
    expect(foundEntry).to.deep.equal(initialState.items[0]);
  });
});

