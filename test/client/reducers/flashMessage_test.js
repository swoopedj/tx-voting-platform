/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { flashMessage }  = require(`${__client}/reducers/flashMessage`);
const actions = require(`${__client}/actionCreators/flashMessage`);

describe('The flash message reducer', () => {
  it('clears message when clear message is called', () => {
    const state = flashMessage(
        Immutable.fromJS({ message: 'test' }),
        actions.clearFlashMessage()
    ).toJS();
    expect(state).to.deep.equal({});
  });
});
