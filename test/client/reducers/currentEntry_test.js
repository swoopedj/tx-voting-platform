/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { currentEntry } = require(`${__client}/reducers/currentEntry`);
const actions = require(`${__client}/actionCreators/entries`);

describe('The currentEntry reducer', () => {
  it('sets the correct state when requesting data', () => {
    const receivedData = {
      test: 1,
    };
    const state = currentEntry(Immutable.fromJS({}), actions.requestEntryInfo(receivedData));
    const jsState = state.toJS();
    expect(jsState.data).to.contain({});
    expect(jsState.isLoading).to.equal(true);
    expect(jsState.error).to.equal(null);
  });
  it('receiveLinkInfo => isLoading : true, error : null, data: {}', () => {
    const receivedData = {
      test: 1,
    };
    const state = currentEntry(Immutable.fromJS({}), actions.receiveEntryInfo(receivedData));
    const jsState = state.toJS();
    expect(jsState.data).to.contain(receivedData);
    expect(jsState.isLoading).to.equal(false);
    expect(jsState.error).to.equal(null);
  });

  it('receiveLinkInfoError => isLoading : false, error : correct error, data: {}', () => {
    const error = {
      test: 1,
    };
    const state = currentEntry(Immutable.fromJS({}), actions.receiveEntryInfoError(error));
    const jsState = state.toJS();
    expect(jsState.data).to.contain({});
    expect(jsState.isLoading).to.equal(false);
    expect(jsState.error).to.contain(error);
  });

  it('requestNewLink => isLoading : false, isSaving: true, inEditMode : false', () => {
    const state = currentEntry(Immutable.fromJS({}), actions.requestNewEntry());
    const jsState = state.toJS();
    expect(jsState.isLoading).to.equal(false);
    expect(jsState.isSaving).to.equal(true);
    expect(jsState.inEditMode).to.equal(false);
  });

  it('receiveNewLink => isLoading : false, isSaving: false, inEditMode : false', () => {
    const state = currentEntry(Immutable.fromJS({}), actions.receiveNewEntry());
    const jsState = state.toJS();
    expect(jsState.isLoading).to.equal(false);
    expect(jsState.isSaving).to.equal(false);
    expect(jsState.inEditMode).to.equal(false);
  });

  it('receiveNewLinkError => error: error, isSaving: false, inEditMode : true', () => {
    const error = { message: 'test' };
    const state = currentEntry(Immutable.fromJS({}), actions.receiveNewEntryError(error));
    const jsState = state.toJS();
    expect(jsState.error, 'error').to.contain(error);
    expect(jsState.isLoading, 'isLoading').to.equal(false);
    expect(jsState.isSaving, 'isSaving').to.equal(false);
    expect(jsState.inEditMode, 'inEditMode').to.equal(true);
  });

  it('chooseCurrentEntry => ', () => {
    const error = { message: 'test' };
    const entries = 
    const state = currentEntry(Immutable.fromJS({}), actions.receiveNewEntryError(error));
    const jsState = state.toJS();
    expect(jsState.error, 'error').to.contain(error);
    expect(jsState.isLoading, 'isLoading').to.equal(false);
    expect(jsState.isSaving, 'isSaving').to.equal(false);
    expect(jsState.inEditMode, 'inEditMode').to.equal(true);
  });
});
