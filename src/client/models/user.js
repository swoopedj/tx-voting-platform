const request = require('../../lib/request.js');

const User = {
  getByAuthID: (authID) => {
    return request.clientFetch(`/api/yt/users/${authID}`);
  },
  insertOrUpdate: (authID, fields) => {
    return request.clientFetch(`/api/yt/users/${authID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
  },
  delete: (id) => {
    return request.clientFetch(`/api/yt/users/${id}`);
  },
};

module.exports = User;
