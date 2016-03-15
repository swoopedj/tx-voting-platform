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
      items: [
        {
          id: 2,
          message: 'two',
        },
      ],
    },
  });
  const buildGetState = (initialState) => {
    return () => initialState;
  };

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    fetchStub = sinon.stub(actions, 'fetchEntries');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it_('dispatches fetch if the required id is not set', function * testAction() {
    fetchStub.resolves({});
    const getState = buildGetState(initialState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(1);
    yield dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(fetchStub.callCount).to.equal(1);
  });

  it_('avoids fetch if the required id is set', function * testAction() {
    fetchStub.resolves({});
    const getState = buildGetState(initialState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(2);
    yield dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(fetchStub.callCount).to.equal(0);
  });

  it_('avoids fetch if not requried id is provided, and array has items', function * testAction() {
    fetchStub.resolves({});
    const getState = buildGetState(initialState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded();
    yield dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(fetchStub.callCount).to.equal(0);
  });

  it_('avoids fetch if already fetching', function * testAction() {
    const fetchingState = initialState.setIn(['entries', 'isFetching'], true);
    fetchStub.resolves({});
    const getState = buildGetState(fetchingState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded(1);
    yield dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(fetchStub.callCount).to.equal(0);
  });

  it_('dispatches fetch if the array is empty', function * testAction() {
    const emptyState = initialState.setIn(['entries', 'items'], Immutable.fromJS([]));
    fetchStub.resolves({});
    const getState = buildGetState(emptyState);
    const dispatchFetchIfNeeded = actions.fetchIfNeeded();
    yield dispatchFetchIfNeeded(dispatchSpy, getState);
    // confirm that the request action was dispatched first
    expect(fetchStub.callCount).to.equal(1);
  });
});
