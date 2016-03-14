/*eslint-disable */
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

module.exports = {
  fetch: function jsonFetch() {
    const args = arguments;
    return fetch.apply(null, args).then(response => response.json());
  },
};
/*eslint-enable */
