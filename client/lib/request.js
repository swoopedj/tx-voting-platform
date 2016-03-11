const fetch = require('isomorphic-fetch');
const queryString = require('query-string');
module.exports = {
  fetch,
  addParams: (urlString, params) => {
    return `${urlString}?${queryString.stringify(params)}`;
  },
};
