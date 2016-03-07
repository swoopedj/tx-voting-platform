require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

function requestLinkInfo(url) {
  return {
    type: 'REQUEST_LINK_INFO',
  };
}

function requestNewTodo(text) {
  return {
    type: 'REQUEST_NEW_TODO',
    id: 'creating',
    text,
  };
}

module.exports = {

};