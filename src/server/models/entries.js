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
    console.log('Error in Create:', error);
    throw new Error('Database Create error');
  });
};

Entry.read = function read() {
  return db.select('*').from('entries')
  .catch((error) => {
    console.log('Error in Read:', error);
    throw new Error('Database Read error');
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
    console.log('Error in Update:', error);
    throw new Error('Database Update error');
  });
};

Entry.remove = function remove(id) {
  return db('entries').where('id', id)
  .returning('id')
  .del()
  .then((response) => {
    console.log('response in remove', response);
    if (response[0] === id) {
      return { success: true };
    }
  })
  .catch((error) => {
    console.log('Error in Remove:', error);
    throw new Error('Database Remove error');
  });
};

