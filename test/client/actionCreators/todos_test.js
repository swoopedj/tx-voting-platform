/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
const Immutable = require('immutable');
require(TEST_HELPER);
const Link = require(`${__client}/models/link`);
const { getLinkInfo } = require(`${__client}/actionCreators/links`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('The getLinkInfo async action', () => {
  it_('dispatches receive link info on success', function * testTodos() {
    const getInfo = sinon.stub(Link, 'getInfo');
    const dispatchSpy = sinon.spy();
    const dispatchLinkInfo = getLinkInfo('http://google.com');
    dispatchLinkInfo(dispatchSpy).then(() => {
      console.log(dispatchSpy.firstCall());
    });
    // expect(state[0]).to.equal = true;
    getInfo.restore();
  });
});





