/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { info } = require(`${__client}/reducers/entryInfo`);
const actions = require(`${__client}/actionCreators/entries`);

describe('The entries info reducer', () => {
  it('sets fetching as true when requesting info', () => {
    const state = info(Immutable.fromJS({}), actions.requestEntryInfo('google.com')).toJS();
    expect(state.data).to.deep.equal({});
    expect(state.isFetching).to.equal(true);
    expect(state.error).to.equal(null);
  });

  it('sets entry info on recieving info', () => {
    const infoResponse = { test: 1 };
    const state = info(Immutable.fromJS({}), actions.receiveEntryInfo(infoResponse)).toJS();
    expect(state.data).to.deep.equal(infoResponse);
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it('sets fetching as false and sets the error when receiving an error', () => {
    const errorResponse = { message: 'test' };
    const state = info(Immutable.fromJS({}), actions.receiveEntryInfoError(errorResponse)).toJS();
    expect(state.data).to.deep.equal({});
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.deep.equal(errorResponse);
  });
});
