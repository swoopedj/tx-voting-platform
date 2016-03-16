/*eslint-disable */
require('es6-promise').polyfill();
const queryString = require('query-string');
const fetch = require('isomorphic-fetch');
const request = {
  fetch: function jsonFetch(...args) {
    return fetch.apply(null, args).then(response => response.json());
  },
  addParams: (urlString, params) => {
    return `${urlString}?${queryString.stringify(params)}`;
  },
  clientFetch: (...args) => {
    request.fetch.apply(null, args)
      .then(response => {
        if(response.error !== null) return Promise.reject(response.error);
        return response.data;
      })
  }
};

module.exports = request;
/*eslint-enable */