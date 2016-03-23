/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const actions = require(`${__client}/actionCreators/entries`);
const sinon = require('sinon');
require('sinon-as-promised');

describe('the addEntry and redirect action', () => {
  let dispatchStub = null;
  let addEntryStub = null;
  let navigateStub = null;

  beforeEach(() => {
    dispatchStub = sinon.stub();
    addEntryStub = sinon.stub(actions, 'addEntry');
    navigateStub = sinon.stub(actions, 'navigate');
  });

  afterEach(() => {
    addEntryStub.restore();
  });

  it_('dispatches push after calling addEntry', function * dispatch() {
    dispatchStub.resolves({});
    const dispatchFunction = actions.addEntryAndRedirect(1, {}, '/');
    yield dispatchFunction(dispatchStub);
    expect(navigateStub.calledAfter(addEntryStub)).to.equal(true);
    expect(navigateStub.calledWith('/')).to.equal(true);
    expect(addEntryStub.calledWith(1, {})).to.equal(true);
  });
});
