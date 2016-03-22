/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const { user } = require(`${__client}/reducers/user`);
const actions = require(`${__client}/actionCreators/users`);

describe('The user reducer', () => {
  it('has the correct state when request the logged in user', () => {
    const state = user(Immutable.fromJS({}), actions.requestLoggedInUser()).toJS();
    expect(state.isLoggedIn).to.equal(false);
    expect(state.isFetching).to.equal(true);
    expect(state.isPopulated).to.equal(false);
  });
  it('has the correct state when receiving a logged in user', () => {
    const userResponse = {
      photo: 'image.com',
    };
    const state = user(Immutable.fromJS({}), actions.receiveLoggedInUser(userResponse)).toJS();
    expect(state.data).to.deep.equal(userResponse);
    expect(state.isLoggedIn).to.equal(true);
    expect(state.isFetching).to.equal(false);
    expect(state.isPopulated).to.equal(true);
  });
  it('has the correct state when receiving a user error', () => {
    const error = {
      message: 'test',
    };
    const state = user(Immutable.fromJS({}), actions.receiveLoggedInUserError(error)).toJS();
    expect(state.error).to.deep.equal(error);
    expect(state.isLoggedIn).to.equal(false);
    expect(state.isFetching).to.equal(false);
    expect(state.isPopulated).to.equal(false);
  });
  it('has the correct state when setting login status', () => {
    const state = user(Immutable.fromJS({}), actions.receiveLoggedInStatus(true)).toJS();
    expect(state.isLoggedIn).to.deep.equal(true);
  });
});
