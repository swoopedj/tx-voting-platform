/* global TEST_HELPER describe it_ TestHelper __client __server afterEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Entry = require(`${__client}/models/entry`);
const request = require(`${__client}/lib/request`);
require('sinon-as-promised');

describe('The client entry model', () => {
  const data = ['video1', 'video2', 'video3', 'video4'];
  // afterEach(() => {
  //   if (requestStub) requestStub.restore();
  // });

  it_.only('fetch gets all entries', function * fetchEntry() {
    // const fetch = sinon.stub(request, 'fetch');
    // fetch.resolves(data);
    const getResult = yield Entry.fetch();
    expect(getResult).to.contain(data);
    // fetch.restore();
  });
});
