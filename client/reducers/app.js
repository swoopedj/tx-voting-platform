const linksReducers = require('../reducers/links.js');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  ...linksReducers,
});
module.exports = appReducer;
