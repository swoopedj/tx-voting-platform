/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Entry = require(`${__client}/models/entry`);
const {
  updateEntry,
  navigateToEntry,
  requestUpdatedEntry,
  receiveUpdatedEntry,
  receiveUpdatedEntryError,
  navigateToEntryEdit,
} = require(`${__client}/actionCreators/entries`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('The updateEntry async action', () => {
  const infoResponse = {
    id: 1,
    title: 'updated',
    description: 'updated',
  };

  const error = {
    message: 'test',
  };
  let dispatchSpy = null;
  let updateEntryStub = null;
  const inputFields = { title: 'updated', description: 'updated' };
  const requestAction = requestUpdatedEntry(1, inputFields, 0);
  const navigationAction = navigateToEntry(1);
  const editNavigationAction = navigateToEntryEdit(1);

  // we need to pass zero as the current time into
  // the error action so that it will line up with the
  // fake we've set
  const errorAction = receiveUpdatedEntryError(error, 0);
  const receiveAction = receiveUpdatedEntry(infoResponse, 0);
  const dispatchUpdateEntry = updateEntry(1, inputFields);
  let clock = null;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    dispatchSpy = sinon.spy();
    updateEntryStub = sinon.stub(Entry, 'update');
  });

  afterEach(() => {
    clock.restore();
    updateEntryStub.restore();
  });

  it_('dispatches recieve update entry on success', function * testAction() {
    updateEntryStub.resolves(infoResponse);
    yield dispatchUpdateEntry(dispatchSpy);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(navigationAction), 'onRequest first').to.equal(true);
    expect(dispatchSpy.secondCall.calledWith(requestAction), 'onRequest second').to.equal(true);
    // confirm that the receive action was dispatched next
    expect(dispatchSpy.thirdCall.calledWith(receiveAction), 'onSuccess').to.equal(true);
  });
  it_('dispatches receive updated entry error on failure', function * testAction() {
    updateEntryStub.rejects(error);
    try {
      yield dispatchUpdateEntry(dispatchSpy);
    } catch (e) {
      expect(e).to.deep.equal(error);
    }
    expect(dispatchSpy.firstCall.calledWith(navigationAction), 'onRequest first').to.equal(true);
    expect(dispatchSpy.secondCall.calledWith(requestAction), 'onRequest second').to.equal(true);
    expect(dispatchSpy.thirdCall.calledWith(editNavigationAction), 'onError first').to.equal(true);
    expect(dispatchSpy.lastCall.calledWith(errorAction), 'onError second').to.equal(true);
  });
});
