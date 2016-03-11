/* global TEST_HELPER describe it_ TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Link = require(`${__server}/models/links`);
const Youtube = require(`${__server}/models/youtube`);
const request = require('supertest');
require('sinon-as-promised');

describe('The Links API', () => {
  let app = null;
  const data = { id: 1, url: 'youtube.com/sxsw' };
  beforeEach(() => {
    app = TestHelper.createApp();
  });

  describe('GET /links', () => {
    it_('returns all links', function * testLinks() {
      const read = sinon.stub(Link, 'read');
      read.resolves(data);
      yield request(app)
        .get('/api/yt/links')
        .expect(200)
        .expect(response => {
          expect(response.body.links).to.include(data);
        });
      read.restore();
    });
  });

  describe('DELETE /links', () => {
    it_('deletes a link', function * deletesLinks() {
      const remove = sinon.stub(Link, 'remove');
      remove.resolves(data);
      yield request(app)
        .delete('/api/yt/links/1')
        .expect(200)
        .expect(response => {
          expect(response.body.link).to.include(data);
          expect(Link.remove.calledOnce).to.equal(true);
          expect(Link.remove.calledWith('1')).to.equal(true);
        });
      remove.restore();
    });
  });

  describe('PUT /links', () => {
    it_('updates a link', function * updateLink() {
      const update = sinon.stub(Link, 'update');
      update.resolves(data);
      yield request(app)
        .put('/api/yt/links/1')
        .expect(200)
        .expect(response => {
          expect(response.body.link).to.include(data);
          expect(Link.update.calledOnce).to.equal(true);
          expect(Link.update.calledWith('1')).to.equal(true);
        });
      update.restore();
    });
  });

  describe('POST /links', () => {
    it_('posts a new link', function * postsLinks() {
      const create = sinon.stub(Link, 'create');
      create.resolves(data);
      yield request(app)
        .post('/api/yt/links')
        .expect(200)
        .expect(response => {
          expect(response.body.returnedLink).to.include(data);
          expect(Link.create.calledOnce).to.equal(true);
        });
      create.restore();
    });
  });
});

describe('The Youtube API', () => {
  let app = null;
  const info = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';
  const badInfo = 'bit.ly/1pbHRQy';
  beforeEach(() => {
    app = TestHelper.createApp();
  });

  describe('GET /api/yt/links/info', () => {
    it_('gets video info from Youtube', function * getYTInfo() {
      const getInfo = sinon.stub(Youtube, 'getInfo');
      getInfo.resolves(info);
      yield request(app)
        .get('/api/yt/links/info')
        .expect(200)
        .query({ url: info })
        .expect((response) => {
          expect(response.body.data).to.include(info);
          expect(Youtube.getInfo.calledOnce).to.equal(true);
        });
      getInfo.restore();
    });

    it_('sends an error when an invalid url is submitted', function *urlValid() {
      const getInfo = sinon.stub(Youtube, 'getInfo');
      getInfo.rejects(new Error('Invalid protocol'));
      yield request(app)
        .get('/api/yt/links/info')
        .query({ url: badInfo })
        .expect(500)
        .expect((response) => {
          expect(response.text).to.equal('Invalid protocol');
          expect(Youtube.getInfo.calledOnce).to.equal(true);
        });
      getInfo.restore();
    });
  });
});
