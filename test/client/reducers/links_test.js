/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const {
  isLinkInfoLoading,
  currentLink,
  isLinkBeingEditted,
  isLinkUpdating,
} = require(`${__client}/reducers/links`);
const {
  requestLinkInfo,
  receiveLinkInfo,
  requestNewLink,
} = require(`${__client}/actionCreators/links`);

describe('The Link Info Loading Reducer', () => {
  it('sets link info as loading after requesting link info', () => {
    const state = isLinkInfoLoading(undefined, requestLinkInfo());
    state.should.equal(true);
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

describe('The isLinkBeingEditted reducer', () => {
  it('sets link being editted as true when link info is recieved', () => {
    const state = isLinkBeingEditted(undefined, receiveLinkInfo({}));
    state.should.equal(true);
  });
  it('sets link being editted as false when a new link is being created', () => {
    const state = isLinkBeingEditted(undefined, requestNewLink({}));
    state.should.equal(false);
  });
});

describe('The isLinkUpdating reducer', () => {
  it('sets link being updated as true when a request is made', () => {
    const state = isLinkUpdating(undefined, requestNewLink({}));
    state.should.equal(true);
  });
});
