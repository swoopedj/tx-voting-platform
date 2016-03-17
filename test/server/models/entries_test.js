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


  it_('updates an item in the entries model given an id and an object with the fields to update', function * update() {
    yield Entries.create(entry);
    const updateResult = yield Entries.updateByID(0, { embedID: '10' });
    expect(updateResult).to.contain({ embedID: '10' });
  });

  it_.only('deletes an item in the entries model', function * remove() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const entryId = insertResult.id;
    const removeResult = yield Entries.remove(entryId);
    expect(removeResult.id, 'removeResult').to.equal(entryId);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries).to.deep.equal([]);
  });
});
