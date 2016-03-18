/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const actions = require(`${__client}/actionCreators/flashMessage`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the tryToClearMessage action creator', () => {
  let dispatchSpy = null;
  let clearStub = null;

  const dispatchClear = (message, currentTime) => {
    const dispatchAction = actions.tryToClearFlashMessage(message, currentTime);
    dispatchAction(dispatchSpy);
  };

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    clearStub = sinon.stub(actions, 'clearFlashMessage');
  });

  afterEach(() => {
    clearStub.restore();
  });

  it('waits 10000ms to clear warnings', () => {
    const message = {
      createdAt: 0,
      type: 'warning',
    };
    dispatchClear(message, 100);
    expect(clearStub.callCount, 'called after 100ms').to.equal(0);
    dispatchClear(message, 10001);
    expect(clearStub.callCount, 'called after 10000ms').to.equal(1);
  });

  it('waits 5000ms to clear success messages', () => {
    const message = {
      createdAt: 0,
      type: 'success',
    };
    dispatchClear(message, 100);
    expect(clearStub.callCount, 'called after 100ms').to.equal(0);
    dispatchClear(message, 5001);
    expect(clearStub.callCount, 'called after 5000ms').to.equal(1);
  });
});
