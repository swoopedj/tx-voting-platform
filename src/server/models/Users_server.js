const db = require('../lib/db');
const Users = module.exports;

const fieldsArray = [
  'id',
  'userName',
  'email',
  'photo',
  'isAdmin',
  'authID',
];

Users.insert = (fields) => {
  return db('users').insert(fields, fieldsArray)
  .then(response => {
    return response[0];
  })
  .catch(error => {
    console.log('Error in users insert:', error);
    throw new Error('user database insert error');
  });
};

Users.update = (id, fields) => {
  return db('users').where('id', id)
  .returning(fieldsArray)
  .update(fields)
  .then(response => {
    return response[0];
  })
  .catch(error => {
    console.log('Error in Users update:', error);
    throw new Error('User database update error');
  });
};
