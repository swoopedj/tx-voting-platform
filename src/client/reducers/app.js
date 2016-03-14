const { entries } = require('../reducers/entries');
const { currentEntry } = require('../reducers/currentEntry');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  entries,
  currentEntry,
});

module.exports = appReducer;
