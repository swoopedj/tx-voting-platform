/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const Link = require(`${__client}/models/link`);
const {
  getLinkInfo,
  requestLinkInfo,
  receiveLinkInfo,
  receiveLinkInfoError,
} = require(`${__client}/actionCreators/links`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('The getLinkInfo async action', () => {
  it_('dispatches receive link info on success', function * testAction() {
    const getInfo = sinon.stub(Link, 'getInfo');
    const url = 'http://google.com';
    const requestAction = requestLinkInfo(url);
    const infoResponse = {
      test: 1,
    };
    const receiveAction = receiveLinkInfo(infoResponse);
    getInfo.resolves(infoResponse);
    const dispatchSpy = sinon.spy();
    const dispatchLinkInfo = getLinkInfo('http://google.com');
    yield dispatchLinkInfo(dispatchSpy);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(requestAction)).to.equal(true);

    // confirm that the receive action was dispatched next
    expect(dispatchSpy.secondCall.calledWith(receiveAction)).to.equal(true);
    getInfo.restore();
  });
  it_('dispatches link info error on failure', function * testAction() {
    const getInfo = sinon.stub(Link, 'getInfo');
    const url = 'http://google.com';
    const requestAction = requestLinkInfo(url);
    const error = {
      message: 'test',
    };
    const errorAction = receiveLinkInfoError(error);
    getInfo.rejects(error);
    const dispatchSpy = sinon.spy();
    const dispatchLinkInfo = getLinkInfo('http://google.com');
    yield dispatchLinkInfo(dispatchSpy);
    // confirm that the request action was dispatched first
    expect(dispatchSpy.firstCall.calledWith(requestAction)).to.equal(true);

    // confirm that the receive action was dispatched next
    expect(dispatchSpy.secondCall.calledWith(errorAction)).to.equal(true);
    getInfo.restore();
  });
});
