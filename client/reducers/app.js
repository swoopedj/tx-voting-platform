const { links } = require('../reducers/links');
const { currentLink } = require('../reducers/currentLink');
const combineReducers = require('redux-immutable').combineReducers;
const routerReducer = require('./router');

const appReducer = combineReducers({
  routing: routerReducer,
  links,
  currentLink,
});

module.exports = appReducer;
