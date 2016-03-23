/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const jsdom = require('jsdom-global');
jsdom();
import MockLocalStorage from 'mock-localstorage';
import Immutable from 'immutable';
const Auth = require(`${__client}/models/auth`);
const userActions = require(`${__client}/actionCreators/users`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the populate user data helper', () => {
  let dispatchSpy = null;
  let isLoggedInStub = null;

  const buildGetState = (input) => {
    return () => input;
  };
  beforeEach(() => {
    global.localStorage = new MockLocalStorage();
    dispatchSpy = sinon.spy();
    isLoggedInStub = sinon.stub(Auth, 'isLoggedIn');
  });

  afterEach(() => {
    isLoggedInStub.restore();
  });

  it('does nothing if already populated', () => {
    // const navigateAction = entryActions.navigate('/login');
    
    const initialState = Immutable.fromJS({
      user: {
        isPopulated: true,
        data: {},
      },
    });
    const getState = buildGetState(initialState);
    const dispatchPopulate = userActions.populateUserData();
    dispatchPopulate(dispatchSpy, getState);
    expect(dispatchSpy.callCount).to.equal(0);
  });

  it('sets login status if not logged and not populated', () => {
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
    dispatchPopulate(dispatchSpy, getState);
    // confirm that the navigate action is called
    expect(dispatchSpy.firstCall.calledWith(setStatusAction)).to.equal(true);
  });

  it('sets login status and user data if logged in and not populated', () => {
    // const navigateAction = entryActions.navigate('/login');
    const sampleData = {
      name: 'Clay', 
    };
    localStorage.setItem('db_user', JSON.stringify(sampleData));
    const initialState = Immutable.fromJS({
      user: {
        isPopulated: false,
      },
    });
    isLoggedInStub.returns(true);
    const setStatusAction = userActions.receiveLoggedInStatus(true);
    const setDataAction = userActions.receiveLoggedInUser(sampleData);
    const getState = buildGetState(initialState);
    const dispatchPopulate = userActions.populateUserData();
    dispatchPopulate(dispatchSpy, getState);
    // confirm that the navigate action is called
    expect(dispatchSpy.firstCall.calledWith(setStatusAction)).to.equal(true);
    expect(dispatchSpy.secondCall.calledWith(setDataAction)).to.equal(true);
  });
});
