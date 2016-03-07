/* global TEST_HELPER describe it it_ TestHelper __server __client beforeEach expect */
'use strict';
require(TEST_HELPER);
const linksReducer = require(`${__client}/reducers/links`);
const { requestNewTodo, receiveNewTodo } = require(`${__client}/actionCreators/todos`);
describe('The Todos Reducer', () => {
  it('adds a new todo on requestNewTodo', () => {
    const state = todosReducer(undefined, requestNewTodo('test'));
    expect(state[0]).to.include({
      text: 'test',
      completed: false,
      id: 'creating',
    });
  });

  it('updates the temporary id to the id in the action', () => {
    const state = [
        { id: 'creating' },
        { id: 'other' },
    ];
    const updatedState = todosReducer(state, receiveNewTodo(5));
    expect(updatedState[0]).to.include({ id: 5 });
    expect(updatedState[1]).to.include({ id: 'other' });
  });
});