const combineReducers = require('redux').combineReducers;
const { routerReducer } = require('react-router-redux');

const appReducer = combineReducers({
  // other reducers here
  routing: routerReducer,
});
module.exports = appReducer;
