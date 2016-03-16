const db = require('../lib/db');
const Entry = module.exports;

Entry.create = function create(entry) {
  return db('entries').insert(entry, [
    'id',
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
    return response[0];
  })
  .catch((error) => {
    throw new Error(error);
  });
};

Entry.update = function update(id, fields) {
  return db('entries').where('id', id)
  .returning(['id', 'thumbnailURL', 'title', 'embedID', 'description', 'statistics'])
  .update(fields)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    throw new Error(error);
  });
};

Entry.remove = function remove(id) {
  return db('entries').where('id', id)
  .returning(['id', 'thumbnailURL', 'title', 'embedID', 'description', 'statistics'])
  .del()
  .then((response) => {
    return response[0];
  })
  .catch((error) => {
    throw new Error(error);
  });
};

