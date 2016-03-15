/*eslint-disable */
require('es6-promise').polyfill();
const queryString = require('query-string');
const fetch = require('isomorphic-fetch');

module.exports = {
  fetch: function jsonFetch() {
    const args = arguments;
    return fetch.apply(null, args).then(response => response.json());
  },
  addParams: (urlString, params) => {
    return `${urlString}?${queryString.stringify(params)}`;
  },
};
/*eslint-enable */