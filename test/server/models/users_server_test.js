/* global TEST_HELPER describe it_ db TestHelper __server beforeEach beforeEach_ expect */
'use strict';
require(TEST_HELPER);
const Users = require(`${__server}/models/Users_server`);
require('sinon-as-promised');
const db = require(`${__server}/lib/db`);

const fakeUser = {
  userName: "Frank",
  email: "frank@example.com",
  photo: "thisIsAPhoto",
  isAdmin: false,
  authID: 'asdgq',
};

const badUser = {
  userName: "Person",
};


describe('The User Model (server)', () => {

  beforeEach_(function * generator() {
    yield TestHelper.emptyDb(db);
  });

  describe('after creating a user', () => {

    it_('adds a user to the database', function * addsAUser() {

      // take in user info
      const insertedUser = yield Users.insert(fakeUser);
      
      // returns a response from the database
      const readUser = yield TestHelper.db('users').read();
      expect(readUser[0]).to.deep.equal(insertedUser);
      // error handled if incorrect info provided

    });

    it_('throws an error if required fields are missing', function * updatesUser() {
      try {
        yield Users.insert(badUser);
      } catch (error) {
        expect(error.message).to.equal('user database insert error');
      }
    });
  });

  describe('when updating user info', () => {
    it_('updates a user\'s data in the database', function * updatesUser() {
      const insertedUser1 = yield Users.insert(fakeUser);
      // takes in an id and an object with user info
      
      const updatedUser = yield Users.update(insertedUser1.id, badUser);

      // returns a response from the data base
      
      expect(updatedUser).to.contain(badUser);

      // error handled if incorrect data provided

      // error handled if user not in db
    });

    it_('throws an error if user id does not exist', function * updateError() {
      try {
        yield Users.update(0, badUser);
      } catch (error) {
        expect(error.message).to.equal('User database update error');
      }
    });
  });


  it_('deletes a user\'s data in the database', function * updatesUser() {

    // takes in an id

    //returns a response from the database

    //error handled if user not in db

  });

  //test for error handling

});

