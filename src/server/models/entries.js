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

const userFields = [
  'userID',
  'email',
  'photo',
  'isAdmin',
  'authID',
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
  .catch((error) => {
    console.log('Error in Update:', error);
    throw new Error('Database Update error');
  })
  .then((response) => {
    if (response.length === 0) throw new Error('Attempted to update invalid user');
    return response[0];
  });
};

Entry.remove = function remove(id) {
  return db('entries').where('id', id)
  .returning('id')
  .del()
  .catch((error) => {
    console.log('Error in Remove:', error);
    throw new Error('Database Remove error');
  })
  .then((response) => {
    if (response.length === 0) throw new Error('Attempted to delete invalid ID');
    return { success: true };
  });
};

Entry.getEntriesWithUsers = function getUsersEntries() {
  return db.select('*').from('entries').fullOuterJoin('users', 'users.id', 'entries.userID')
  .then(response => {
    const entries = response.map(item => {
      const user = {};
      const entry = {};
      userFields.forEach(field => {
        user[field] = item[field];
      });
      fieldsArray.forEach(field => {
        entry[field] = item[field];
      });
      entry.user = user;
      return entry;
    });
    return entries;
  })
  .catch(error => {
    console.log('Error in getEntriesWithUsers:', error);
    throw new Error('Database Read All Entries and Users error');
  });
};
