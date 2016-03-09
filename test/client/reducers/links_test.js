/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const reducers = require(`${__client}/reducers/links`);
const actions = require(`${__client}/actionCreators/links`);


describe('The links reducer', () => {
  it('sets links array on receieve links', () => {
    const linkResponse = [
      {
        id: 1,
        title: 'one',
      },
      {
        id: 2,
        title: 'two',
      },
    ];
    const links = reducers.links(Immutable.fromJS([]), actions.receiveLinks(linkResponse)).toJS();
    expect(links[0]).to.contain(linkResponse[0]);
    expect(links[1]).to.contain(linkResponse[1]);
  });
});



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

describe('The linksAreLoading reducer', () => {
  it('sets areLinksLoading as true when a request is made', () => {
    const state = reducers.linksAreLoading(false, actions.requestLinks({}));
    state.should.equal(true);
  });
  it('sets areLinksLoading as false when a request is received', () => {
    const state = reducers.linksAreLoading(true, actions.receiveLinks({}));
    state.should.equal(false);
  });
});

describe('The getLinksError reducer', () => {
  const error = {
    message: 'test',
  };
  it('sets getLinkError as null when a getLinks request is made', () => {
    const state = reducers.getLinksError(Immutable.fromJS(error), actions.requestLinks({}));
    expect(state).to.equal(null);
  });
  it('sets the getLinkError when an error is received', () => {
    const state = reducers.getLinksError(undefined, actions.receiveLinksError(error));
    (state.toJS()).should.contain(error);
  });
});
