const { entries } = require('../reducers/entries');
const { entriesForUser } = require('../reducers/entriesForUser');
const { user } = require('../reducers/user');
const { flashMessage } = require('../reducers/flashMessage');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  entriesForUser,
  entries,
  flashMessage,
  user,
});

module.exports = appReducer;
