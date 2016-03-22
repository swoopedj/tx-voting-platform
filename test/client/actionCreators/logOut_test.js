/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const jsdom = require('jsdom-global');
jsdom();
const actions = require(`${__client}/actionCreators/users`);
const Auth = require(`${__client}/models/auth`);
const sinon = require('sinon');
require('sinon-as-promised');
describe('the logout action', () => {
  let dispatchSpy = null;
  let logoutStub = null;
  let localStorageStub = null;

  beforeEach(() => {
    global.localStorage = {};
    setItemStub = sinon.stub(localStorage, 'setItem');
    dispatchSpy = sinon.spy();
    logoutStub = sinon.stub(Auth, 'logout');
  });

  afterEach(() => {
    setItemStub.restore();
    logoutStub.restore();
    localStorageStub.restore();
  });

  // it('dispatches clear user data and calls logout', () => {
  //   const dispatchFunction = actions.logOut();
  //   const clearUserDataAction = actions.clearUserData();
  //   dispatchFunction(dispatchSpy);
  //   expect(dispatchSpy.firstCall.calledWith(clearUserDataAction), 'clear user data was called').to.equal(true);
  //   expect(logoutStub.callCount, 'logout was called').to.equal(1);
  // });
});

