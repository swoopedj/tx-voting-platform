/* global TEST_HELPER describe it_ TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Link = require(`${__server}/models/links`);
const request = require('supertest');
require('sinon-as-promised');

describe('The Links API', () => {
  let app = null;
  beforeEach(() => {
    app = TestHelper.createApp();
  });

  describe('GET /links', () => {
    it_('returns all links', function * testLinks() {
      const read = sinon.stub(Link, 'read');
      read.resolves({ url: 'youtube.com/axw' });
      yield request(app)
        .get('/api/yt/links')
        .expect(200)
        .expect(response => {
          expect(response.body.links).to.include({ url: 'youtube.com/axw' });
        });
      read.restore();
    });
  });

  describe('DELETE /links', () => {
    it_('deletes a link', function * deletesLinks() {
      const read = sinon.stub(Link, 'read');
      read.resolves({ id: 1, url: 'youtube.com/axw' });
      yield request(app)
        .get('/api/yt/links')
        .expect(200)
        .expect(response => {
          expect(response.body.links).to.include({ id: 1, url: 'youtube.com/axw' });
        });
      const remove = sinon.stub(Link, 'remove');
      remove.resolves({ id: 1, url: 'youtube.com/axw' });
      yield request(app)
        .delete('/api/yt/links/1')
        .expect(200)
        .expect(response => {
          expect(response.body.link).to.include({ id: 1, url: 'youtube.com/axw' });
          expect(Link.remove.calledOnce).to.equal(true);
          expect(Link.remove.calledWith('1')).to.equal(true);
        });
      read.restore();
      remove.restore();
    });
  });
});
