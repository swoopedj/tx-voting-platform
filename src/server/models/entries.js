const db = require('../lib/db');
const Entry = module.exports;

Entry.create = function create(entry) {
  return db('entries').insert(entry, [
    'thumbnailURL',
    'title',
    'embedID',
    'description',
    'statistics',
  ])
  .then((response) => {
    return response[0];
  })
  .catch((error) => {
    throw new Error(error);
  });
};

Entry.read = function read() {
  return db.select('*').from('entries')
  .then((response) => {
    console.log('888888888888888888', response)
    return response[0];
  })
  .catch((error) => {
    console.log('.............error', error)
    throw new Error(error);
  });
};

Entry.update = function update(id, fields) {
  return db('entries').update(id, fields);
};

Entry.remove = function remove(id) {
  return db('entries').delete(id);
};

