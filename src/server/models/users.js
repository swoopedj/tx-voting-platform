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

Users.update = (authID, fields) => {
  return db('users').where('authID', authID)
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

Users.delete = (id) => {
  return db('users').where('id', id)
  .returning('id')
  .del()
  .catch(error => {
    console.log('Error in Users delete:', error);
    throw new Error('User database delete error');
  })
  .then(response => {
    if (response.length === 0) throw new Error('Attempted to delete invalid user id');
    return { success: true, id: response[0] };
  });
};

Users.findByAuthID = (authID) => {
  return db('users').where('authID', authID)
  .returning(fieldsArray)
  .catch(error => {
    console.log('Error finding user:', error);
    throw new Error('Cannot find provided user');
  })
  .then(response => {
    if (response.length === 0) throw new Error('User does not exist');
    return response[0];
  });
};

Users.insertOrUpdateUsingAuthID = (authID, fields) => {
  return Users.findByAuthID(authID)
  .catch(error => {
    if (error.message === 'User does not exist') {
      Promise.resolve();
    }
  })
  .then(response => {
    if (response) {
      return Users.update(authID, fields);
    }
    return Users.insert(fields)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.log('Insert error in insertOrUpdate:', error);
      throw new Error('user database insert error');
    });
  });
};
