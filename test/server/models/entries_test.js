/* global TEST_HELPER describe it_ db TestHelper __server beforeEach beforeEach_ expect */
'use strict';
require(TEST_HELPER);
const Entries = require(`${__server}/models/entries`);
require('sinon-as-promised');
const db = require(`${__server}/lib/db`);

describe('The entries model', () => {
  const testUser = {
    id: 0,
    userName: 'clay',
    email: 'clay@test.com',
    isAdmin: false,
    authID: 'qgraerdfb',
  };

  const entry = {
    id: 0,
    title: 'test',
    embedID: '5',
    thumbnailURL: 'google.com',
    statistics: {
      stuff: 'test',
    },
    description: 'description',
    sortMetric: 10,
    userID: 0,
  };

  const successTrue = {
    success: true,
  };

  beforeEach_(function * generator() {
    yield TestHelper.emptyDb(db);
    yield TestHelper.db('users').create(testUser);
  });

  it_('inserts an item into the database and reads it back', function * insert() {
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.deep.equal(entry);
    const readEntries = yield Entries.read();
    expect(readEntries[0]).to.deep.equal(entry);
  });

// updates an item in the entries model given an id and an object with the fields to update
  it_('updates an item in the entries model', function * update() {
    yield Entries.create(entry);
    const updateResult = yield Entries.updateByID(0, { embedID: '10' });
    expect(updateResult).to.contain({ embedID: '10' });
  });

  it_('deletes an item in the entries model', function * remove() {
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.deep.equal(entry);
    const entryId = insertResult.id;
    const removeResult = yield Entries.remove(entryId);
    expect(removeResult, 'removeResult').to.deep.equal(successTrue);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries).to.deep.equal([]);
  });

  it_('throws errors when the wrong information is passed into delete', function * remove() {
    try {
      yield Entries.remove(4);
    } catch (error) {
      expect(error.message).to.equal('Attempted to delete invalid ID');
    }
  });
});
