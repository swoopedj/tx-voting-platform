/* global TEST_HELPER describe it_ TestHelper __client __lib afterEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Entry = require(`${__client}/models/entry`);
const request = require(`${__lib}/request`);
const entryResult = require('./entry-result');
require('sinon-as-promised');

describe('The client entry model', () => {
  const data = entryResult.data;
  // afterEach(() => {
  //   if (fetch) fetch.restore();
  // });

  it_('fetch gets all entries', function * fetchEntry() {
    const fetch = sinon.stub(request, 'fetch');
    fetch.resolves(data);
    const getResult = yield Entry.fetch();
    expect(getResult.thumbnailURL).to.equal(data.data.items[0].snippet.thumbnails.high.url);
    fetch.restore();
  });

  it_('create adds an entry', function * createEntry() {
    const fetch = sinon.stub(request, 'fetch');
    fetch.resolves({ message: 'test' });
    const createAnEntry = yield Entry.create({ message: 'test' });
    expect(createAnEntry.message).to.equal('test');
    fetch.restore();
  });
});
