/* global TEST_HELPER describe it_ TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Link = require(`${__server}/models/links`);
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
      // const linkStub = sinon.stub(Link, linkStub);
      // linkStub.resolves({id: 3, url: 'youtube.com/uvw'});
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
