/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const jsdom = require('jsdom-global');
jsdom();
import Immutable from 'immutable';
const Auth = require(`${__client}/models/auth`);
const userActions = require(`${__client}/actionCreators/users`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the populate user data helper', () => {
  let dispatchStub = null;
  let getUserDataStub = null;
  let isLoggedInStub = null;
  let getCachedUserStub = null;

  const buildGetState = (input) => {
    return () => input;
  };
  beforeEach(() => {
    dispatchStub = sinon.stub();
    dispatchStub.resolves({});
    getCachedUserStub = sinon.stub(userActions, 'getCachedUser');
    getUserDataStub = sinon.stub(Auth, 'getUserData');
    isLoggedInStub = sinon.stub(Auth, 'isLoggedIn');
  });

  afterEach(() => {
    getUserDataStub.restore();
    isLoggedInStub.restore();
    getCachedUserStub.restore();
  });

  it_('does nothing if already populated', function * generator() {
    // const navigateAction = entryActions.navigate('/login');
    
    const initialState = Immutable.fromJS({
      user: {
        isPopulated: true,
        data: {},
      },
    });
    const getState = buildGetState(initialState);
    const dispatchPopulate = userActions.populateUserData();
    yield dispatchPopulate(dispatchStub, getState);
    // confirm that the navigate action is called
    expect(dispatchStub.callCount).to.equal(0);
  });

  it_('sets login status if not logged and not populated', function * generator() {
    // const navigateAction = entryActions.navigate('/login');
    const initialState = Immutable.fromJS({
      user: {
        isPopulated: false,
        isLoggedIn: false,
      },
    });
    isLoggedInStub.returns(false);
    const setStatusAction = userActions.receiveLoggedInStatus(false);
    const getState = buildGetState(initialState);
    const dispatchPopulate = userActions.populateUserData();
    yield dispatchPopulate(dispatchStub, getState);
    // confirm that the navigate action is called
    expect(dispatchStub.firstCall.calledWith(setStatusAction)).to.equal(true);
  });

  it_('sets login status and user data if logged in and not populated', function * generator() {
    // const navigateAction = entryActions.navigate('/login');
    const initialState = Immutable.fromJS({
      user: {
        isPopulated: false,
      },
    });
    getCachedUserStub.resolves({});
    isLoggedInStub.returns(true);
    const setStatusAction = userActions.receiveLoggedInStatus(true);
    const getState = buildGetState(initialState);
    const dispatchPopulate = userActions.populateUserData();
    yield dispatchPopulate(dispatchStub, getState);
    // confirm that the navigate action is called
    expect(dispatchStub.firstCall.calledWith(setStatusAction)).to.equal(true);
    expect(getCachedUserStub.callCount).to.equal(1);
  });

});
