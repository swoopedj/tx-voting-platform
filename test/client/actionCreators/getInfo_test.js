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
  let dispatchSpy = null;
  let getInfoStub = null;
  const url = 'http://google.com';
  const requestAction = requestEntryInfo(url);
  const errorAction = receiveEntryInfoError(error);
  const receiveAction = receiveEntryInfo(infoResponse);
  const dispatchLinkInfo = getEntryInfo('http://google.com');
  beforeEach(() => {
    dispatchSpy = sinon.spy();
    getInfoStub = sinon.stub(Entry, 'getInfo');
  });

  afterEach(() => {
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
    yield dispatchLinkInfo(dispatchSpy);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(requestAction)).to.equal(true);
    // confirm that the receive action was dispatched next
    expect(dispatchSpy.secondCall.calledWith(errorAction)).to.equal(true);
  });
});
