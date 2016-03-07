const appReducer = require('../reducers/app');
const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk');

module.exports = () => {
  const store = createStore(appReducer, applyMiddleware(thunkMiddleware));
  return store;
};
