const Immutable = require('immutable');
const appReducer = require('../reducers/app');
const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk');

const initialState = Immutable.Map();
module.exports = () => {
  const store = createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
  return store;
};
