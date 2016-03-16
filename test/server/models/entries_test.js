/* global TEST_HELPER describe it_ db TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const Entries = require(`${__server}/models/entries`);
require('sinon-as-promised');
const db = require(`${__server}/lib/db`);

describe('The entries model', () => {
  beforeEach(() => {
    return TestHelper.emptyDb(db);
  });

  it_('reads an item into the entries models', function * insert() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield TestHelper.db('entries').create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const readEntries = yield Entries.read();
    expect(readEntries).to.contain(entry);
    // TestHelper.db.read();
    // read and confirm that read works
    // this will use DB read not the model
  });

  it_('inserts an item into the entries models', function * insert() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries[0]).to.contain(entry);
  });

  it_('updates an item in the entries model', function * update() {
    const entry = {
      title: 'test',
    };
    const newLink = {
      title: 'whatever',
    };
    const insertResult = yield Entries.create(entry);
    const entryId = insertResult.id;
    expect(insertResult, 'insertResults').to.contain(entry);
    const updateResult = yield Entries.update(entryId, newLink);
    expect(updateResult[0].title, 'updateResults').to.equal(newLink.title);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries[0]).to.contain(newLink);
  });

  it_('deletes an item in the entries model', function * remove() {
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
