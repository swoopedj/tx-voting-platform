/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { entries } = require(`${__client}/reducers/entries`);
const actions = require(`${__client}/actionCreators/entries`);

describe('The entries reducer', () => {
  it('sets entries array on receieve entries', () => {
    const entryResponse = [
      {
        id: 1,
        title: 'one',
      },
      {
        id: 2,
        title: 'two',
      },
    ];
    const state = entries(Immutable.fromJS({}), actions.receiveEntries(entryResponse)).toJS();
    expect(state.items).to.deep.equal(entryResponse);
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it('sets links error on receieve error', () => {
    const error = {
      message: 'test',
    };
    const state = entries(Immutable.fromJS({}), actions.receiveEntriesError(error)).toJS();
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });

  it('sets loading on request', () => {
    const state = entries(Immutable.fromJS({}), actions.requestEntries()).toJS();
    expect(state.isFetching).to.equal(true);
    expect(state.items).to.deep.equal([]);
  });

  it('sets saving on save', () => {
    const state = entries(Immutable.fromJS({}), actions.requestNewEntry()).toJS();
    expect(state.isAddingNew).to.equal(true);
  });

  it('stop saving on receive new item', () => {
    const state = entries(Immutable.fromJS({}), actions.receiveNewEntry()).toJS();
    expect(state.isAddingNew).to.equal(false);
  });

  it('set link error on create link error', () => {
    const error = { message: 'test' };
    const state = entries(Immutable.fromJS({}), actions.receiveNewEntryError(error)).toJS();
    expect(state.isAddingNew).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });
});
