/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const reducers = require(`${__client}/reducers/links`);
const actions = require(`${__client}/actionCreators/links`);

describe('The Link Info Loading Reducer', () => {
  it('sets link info as loading after requesting link info', () => {
    const state = reducers.isLinkInfoLoading(undefined, actions.requestLinkInfo());
    state.should.equal(true);
  });
});

describe('The currentLink reducer', () => {
  it('sets the currentLink with received link info', () => {
    const linkData = {
      test: 1,
    };
    const state = reducers.currentLink(null, actions.receiveLinkInfo(linkData));
    expect(state.toJS()).to.contain(linkData);
  });
});

describe('The createLinkError reducer', () => {
  const error = {
    message: 'test',
  };
  it('sets the createLinkErrror when an error is received', () => {
    const state = reducers.createLinkError(null, actions.receiveNewLinkError(error));
    expect(state.toJS()).to.contain(error);
  });
  it('sets the createLinkErrror to null when a request is sent', () => {
    const state = reducers.createLinkError(Immutable.fromJS(error), actions.requestNewLink());
    expect(state).to.equal(null);
  });
});

describe('The isLinkBeingEditted reducer', () => {
  it('sets link being editted as true when link info is recieved', () => {
    const state = reducers.isLinkBeingEditted(undefined, actions.receiveLinkInfo({}));
    state.should.equal(true);
  });
  it('sets link being editted as false when a new link is being created', () => {
    const state = reducers.isLinkBeingEditted(undefined, actions.requestNewLink({}));
    state.should.equal(false);
  });
});

describe('The isLinkUpdating reducer', () => {
  it('sets link being updated as true when a request is made', () => {
    const state = reducers.isLinkUpdating(undefined, actions.requestNewLink({}));
    state.should.equal(true);
  });
  it('sets link being updated as true when a request is made', () => {
    const state = reducers.isLinkUpdating(undefined, actions.requestNewLink({}));
    state.should.equal(true);
  });
  it('sets link being updated as false when a new link is received', () => {
    const state = reducers.isLinkUpdating(true, actions.receiveNewLink());
    state.should.equal(false);
  });
  it('sets isLinkUpdating as false when a link error is received', () => {
    const state = reducers.isLinkUpdating(true, actions.receiveNewLinkError());
    state.should.equal(false);
  });
});
