/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach afterEach expect */
'use strict';
require(TEST_HELPER);
const Immutable = require('immutable');
const actions = require(`${__client}/actionCreators/entries`);

describe('The mixInputFieldsIntoEntry helper', () => {
  it('applies all included input fields to the entry and returns an immutable object', () => {
    const entry = Immutable.fromJS({
      text: 'old',
      description: 'old',
      other: 'test',
    });

    const inputFields = {
      text: 'new',
      description: 'new',
    };
    expect(actions.mixInputFieldsIntoEntry(entry, inputFields).toJS()).to.deep.equal({
      text: 'new',
      description: 'new',
      other: 'test',
    });
  });
  it('works correctly with empty fields', () => {
    const entry = Immutable.fromJS({
      text: 'old',
    });
    expect(actions.mixInputFieldsIntoEntry(entry, {}).toJS()).to.deep.equal({
      text: 'old',
    });
  });
});
