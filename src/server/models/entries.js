const db = require('../lib/db');
const Entry = module.exports;
const fieldsArray = [
  'id',
  'thumbnailURL',
  'title',
  'embedID',
  'description',
  'statistics',
  'sortMetric',
  'userID',
];

Entry.create = function create(entry) {
  return db('entries').insert(entry, fieldsArray)
  .then((response) => {
    return response[0];
  })
  .catch((error) => {
    throw new Error(error);
  });
};

Entry.read = function read() {
  return db.select('*').from('entries')
  .catch((error) => {
    throw new Error(error);
  });
};

Entry.updateByID = function update(id, fields) {
  return db('entries').where('id', id)
  .returning(fieldsArray)
  .update(fields)
  .then((response) => {
    return response[0];
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

