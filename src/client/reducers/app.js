const { entries } = require('../reducers/entries');
const { flashMessage } = require('../reducers/flashMessage');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  entries,
  flashMessage,
});

module.exports = appReducer;
