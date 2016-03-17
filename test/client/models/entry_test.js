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
  const dataResult = entryResult.result;

  it_('fetch gets all entries', function * fetchEntry() {
    const fetch = sinon.stub(request, 'clientFetch');
    const entries = [
      { id: 1 },
    ];
    fetch.resolves(entries);
    const returnedEntries = yield Entry.fetch();
    expect(fetch.calledWith('/api/yt/entries')).to.equal(true);
    expect(returnedEntries).to.deep.equal(entries);
    fetch.restore();
  });

  it_('create adds an entry', function * createEntry() {
    const fetch = sinon.stub(request, 'clientFetch');
    const entry = { message: 'test' };
    const args = ['/api/yt/entries',
      { method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      },
    ];
    fetch.resolves(entry);
    const createAnEntry = yield Entry.create(entry);
    expect(fetch.calledWith(args[0], args[1])).to.equal(true);
    expect(createAnEntry.message).to.equal('test');
    fetch.restore();
  });

  it_('takes a url and gets info from Youtube', function * getYTInfo() {
    const fetch = sinon.stub(request, 'clientFetch');
    fetch.resolves(data);
    const ytInfo = yield Entry.getInfo('http://bit.ly');
    expect(fetch.calledWith('http://localhost:4000/api/yt/entries/info?url=http%3A%2F%2Fbit.ly')).to.equal(true);
    expect(ytInfo).to.deep.equal(dataResult);
    fetch.restore();
  });

  it_('deletes an entry from the database', function * deleteEntry() {
    const fetch = sinon.stub(request, 'clientFetch');
    fetch.resolves(dataResult);
    const removedEntry = yield Entry.delete(1);
    expect(fetch.calledWith('http://localhost:4000/api/yt/entries/?id=1')).to.equal(true);
    expect(removedEntry).to.deep.equal(dataResult);
    fetch.restore();
  });
});
