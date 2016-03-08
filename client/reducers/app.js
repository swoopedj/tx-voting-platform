const { isLinkInfoLoading } = require('../reducers/links.js');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  isLinkInfoLoading,
  routing: routerReducer,
});
module.exports = appReducer;
