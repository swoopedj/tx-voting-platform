/* global TEST_HELPER describe it_ TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
// const Link = require(`${__server}/models/links`);
const Youtube = require(`${__server}/models/youtube`);
const ytOutput = require('./ytResult').output;

require('sinon-as-promised');
// const fetch = require('isomorphic-fetch');
const request = require('../../../server/lib/request');


describe('The Youtube Model', () => {
  // let app = null;
  const sample = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';
  beforeEach(() => {
    // app = TestHelper.createApp();
  });

  describe('Get Video Info', () => {
    //  /////////////////////////////////////////////////////////////////Onlying
    it_.only('gets data from youtube', function * ytinfo() {
      const fetch = sinon.stub(request, 'fetch');
      fetch.resolves(ytOutput);
      // yield request(app)
      const response = yield Youtube.getInfo(sample);
      expect(response).to.equal(ytOutput);
      // console.log('.....................', response);
      fetch.restore();
    });
  });
});
