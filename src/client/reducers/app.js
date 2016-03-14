const { entries } = require('../reducers/entries');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  entries,
});

module.exports = appReducer;
