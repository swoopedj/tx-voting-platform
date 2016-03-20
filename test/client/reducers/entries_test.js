/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { entries } = require(`${__client}/reducers/entries`);
const actions = require(`${__client}/actionCreators/entries`);

describe('The entries reducer', () => {
  it('sets entries array on receieve entries', () => {
    const entryResponse = [
      {
        id: 1,
        title: 'one',
      },
      {
        id: 2,
        title: 'two',
      },
    ];
    const state = entries(Immutable.fromJS({}), actions.receiveEntries(entryResponse)).toJS();
    expect(state.items).to.deep.equal(entryResponse);
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it('sets links error on receieve error', () => {
    const error = {
      message: 'test',
    };
    const state = entries(Immutable.fromJS({}), actions.receiveEntriesError(error)).toJS();
    expect(state.isFetching).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });

  it('sets loading on request', () => {
    const state = entries(Immutable.fromJS({}), actions.requestEntries()).toJS();
    expect(state.isFetching).to.equal(true);
    expect(state.items).to.deep.equal([]);
  });

  it('sets isWorking on create new entry', () => {
    const state = entries(Immutable.fromJS({}), actions.requestNewEntry()).toJS();
    expect(state.isWorking).to.equal(true);
  });

  it('stop saving on receive new item', () => {
    const state = entries(Immutable.fromJS({}), actions.receiveNewEntry()).toJS();
    expect(state.isWorking).to.equal(false);
  });
  it('set link error on create link error', () => {
    const error = { message: 'test' };
    const state = entries(Immutable.fromJS({}), actions.receiveNewEntryError(error)).toJS();
    expect(state.isWorking).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });
  describe('The inputFields property', () => {
    it('has a new key and value added to it on changeEntryInputField', () => {
      const state = entries(
        Immutable.fromJS({}),
        actions.changeEntryInputField('text', 'newValue')
      ).toJS();
      expect(state.inputFields.text).to.equal('newValue');
    });
    describe('Is set to an empty object', () => {
      const confirmEmptyAfterAction = (action) => {
        const state = entries(
          Immutable.fromJS({
            inputFields: {
              stuff: true,
            },
          }),
          action,
        ).toJS();
        expect(state.inputFields).to.deep.equal({});
      };
      it('on receiveNewEntry', () => {
        confirmEmptyAfterAction(actions.receiveNewEntry());
      });
      it('on receiveUpdatedEntry', () => {
        confirmEmptyAfterAction(actions.receiveUpdatedEntry());
      });
    });
  });

});
