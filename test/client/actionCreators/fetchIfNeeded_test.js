/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const Entry = require(`${__client}/models/entry`);
const actions = require(`${__client}/actionCreators/entries`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the fetch if needed helper', () => {
  let dispatchSpy = null;
  let fetchStub = null;
  let initialState = Immutable.fromJS({
    entries: {
      itemsByID: {
        
      },
    },
  });
  const buildGetState = (input) => {
    return () => input;
  };

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    fetchStub = sinon.stub(actions, 'fetchEntries');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('dispatches fetch if the required id is not set', () => {
    fetchStub.resolves({});
    const getState = buildGetState(initialState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(1);
    dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.callCount).to.equal(1);
  });

  it('avoids fetch if the required id is set', () => {
    fetchStub.resolves({});
    const updatedState = initialState.setIn(['entries', 'itemsByID', 2], Immutable.fromJS({test: 1}));
    const getState = buildGetState(updatedState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(2);
    dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.callCount).to.equal(0);
  });

  it('avoids fetch if no requried id is provided, and array has items', () => {
    fetchStub.resolves({});
    const updatedState = initialState.setIn(['entries', 'itemsByID', 2], Immutable.fromJS({test: 1}));
    const getState = buildGetState(updatedState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded();
    dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.callCount).to.equal(0);
  });

  it('avoids fetch if already fetching', () => {
    const fetchingState = initialState.setIn(['entries', 'isFetching'], true);
    fetchStub.resolves({});
    const getState = buildGetState(fetchingState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(1);
    dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.callCount).to.equal(0);
  });

  it('dispatches fetch if the array is empty', () => {
    const emptyState = initialState.setIn(['entries', 'itemsByID'], Immutable.fromJS({}));
    fetchStub.resolves({});
    const getState = buildGetState(emptyState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded();
    dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.callCount).to.equal(1);
  });
});
