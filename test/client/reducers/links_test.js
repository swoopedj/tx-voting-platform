/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { links } = require(`${__client}/reducers/links`);
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
    const state = links(Immutable.fromJS({}), actions.receiveLinks(linkResponse)).toJS();
    expect(state.items).to.deep.equal(linkResponse);
    expect(state.isLoading).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it('sets links error on receieve error', () => {
    const error = {
      message: 'test',
    };
    const state = links(Immutable.fromJS({}), actions.receiveLinksError(error)).toJS();
    expect(state.isLoading).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });

  it('sets loading on request', () => {
    const state = links(Immutable.fromJS({}), actions.requestLinks()).toJS();
    expect(state.isLoading).to.equal(true);
    expect(state.items).to.deep.equal([]);
  });
});
