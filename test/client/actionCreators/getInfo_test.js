/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Entry = require(`${__client}/models/entry`);
const {
  getEntryInfo,
  requestEntryInfo,
  receiveEntryInfo,
  receiveEntryInfoError,
} = require(`${__client}/actionCreators/entries`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('The getLinkInfo async action', () => {
  const infoResponse = {
    test: 1,
  };
  const error = {
    message: 'test',
  };
  let clock = null;
  let dispatchSpy = null;
  let getInfoStub = null;
  const url = 'http://google.com';
  const requestAction = requestEntryInfo(url);

  // we need to pass zero as the current time into
  // the error action so that it will line up with the
  // fake we've set
  const errorAction = receiveEntryInfoError(error, 0);
  const receiveAction = receiveEntryInfo(infoResponse);
  const dispatchLinkInfo = getEntryInfo('http://google.com');
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    dispatchSpy = sinon.spy();
    getInfoStub = sinon.stub(Entry, 'getInfo');
  });

  afterEach(() => {
    clock.restore();
    getInfoStub.restore();
  });

  it_('dispatches receive link info on success', function * testAction() {
    getInfoStub.resolves(infoResponse);
    yield dispatchLinkInfo(dispatchSpy);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(requestAction)).to.equal(true);
    // confirm that the receive action was dispatched next
    expect(dispatchSpy.secondCall.calledWith(receiveAction)).to.equal(true);
  });
  it_('dispatches link info error on failure', function * testAction() {
    getInfoStub.rejects(error);
    try {
      yield dispatchLinkInfo(dispatchSpy);
    } catch(error) {
      expect(error).to.deep.equal(error);
    }
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(requestAction)).to.equal(true);
    // confirm that the receive action was dispatched next
    expect(dispatchSpy.secondCall.calledWith(errorAction)).to.equal(true);
  });
});
