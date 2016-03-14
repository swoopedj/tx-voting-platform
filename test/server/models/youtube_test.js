/* global TEST_HELPER describe it_ TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Youtube = require(`${__server}/models/youtube`);
const ytOutput = require('./ytResult').output;
const unshortener = require(`${__server}/lib/unshortener`);
const request = require(`${__server}/lib/request`);
require('sinon-as-promised');

describe('The Youtube Model', () => {
  const sample = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';
  const shortenedSample = 'http://bit.ly/OUv03h';

  describe('Get Video Info', () => {
    it_('gets data from youtube', function * ytinfo() {
      const fetch = sinon.stub(request, 'fetch');
      fetch.resolves(ytOutput);
      const response = yield Youtube.getInfo(sample);
      expect(response).to.include(ytOutput);
      fetch.restore();
    });

    it_('expands a shortened youtube link', function * checkShortened() {
      const expand = sinon.stub(unshortener, 'expand');
      expand.resolves(sample);
      const fetch = sinon.stub(request, 'fetch');
      fetch.resolves(ytOutput);
      const response = yield Youtube.getInfo(shortenedSample);
      expect(response).to.include(ytOutput);
      fetch.restore();
      expand.restore();
    });
  });

    // describe('Get Video Info', () => {
    //   it_('gets batch data from youtube', function * ytinfo() {
    //   }
  // describe('Shortens a shortened link')
});
