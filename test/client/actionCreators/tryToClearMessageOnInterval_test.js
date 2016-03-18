/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
import Immutable from 'immutable';
const actions = require(`${__client}/actionCreators/flashMessage`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the tryToClearMessageOnInterval action creator', () => {
  let clock = null;
  let dispatchSpy = null;
  let tryToClearStub = null;

  const buildGetState = (input) => {
    return () => input;
  };

  const dispatchClearOnInterval = (initialState) => {
    const getState = buildGetState(initialState);
    const dispatchAction = actions.tryToClearFlashMessageOnInterval();
    dispatchAction(dispatchSpy, getState);
  };

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    dispatchSpy = sinon.spy();
    tryToClearStub = sinon.stub(actions, 'tryToClearFlashMessage');
  });

  afterEach(() => {
    tryToClearStub.restore();
    clock.restore();
  });

  it('calls tryToClearMessage every 250ms', () => {
    const initialState = Immutable.fromJS({
      flashMessage: {
        isVisible: true,
        createdAt: 0,
        type: 'warning',
      },
    });
    dispatchClearOnInterval(initialState);
    expect(tryToClearStub.callCount, 'called once times after 0ms').to.equal(1);
    clock.tick(251);
    expect(tryToClearStub.callCount, 'called twice after 251ms').to.equal(2);
    clock.tick(251);
    expect(tryToClearStub.callCount, 'called three times after 500ms').to.equal(3);
  });
  it('stops the interval if the message is null', () => {
    const initialState = Immutable.fromJS({
      flashMessage: {
        isVisible: false,
      },
    });
    dispatchClearOnInterval(initialState);
    clock.tick(250);
    expect(tryToClearStub.callCount, 'called no times after 250ms').to.equal(0);
  });
});
