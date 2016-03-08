/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const { isLinkInfoLoading, currentLink } = require(`${__client}/reducers/links`);
const { requestLinkInfo, receiveLinkInfo } = require(`${__client}/actionCreators/links`);
describe('The Link Info Loading Reducer', () => {
  it('sets link info as loading after requesting link info', () => {
    const state = isLinkInfoLoading(false, requestLinkInfo());
    expect(state[0]).to.equal = true;
  });
});

describe('The currentLink reducer', () => {
  it('sets the currentLink with received link info', () => {
    const linkData = {
      test: 1,
    };
    const state = currentLink(null, receiveLinkInfo(linkData));
    expect(state.toJS()).to.contain(linkData);
  });
});
