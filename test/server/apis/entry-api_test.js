/* global TEST_HELPER describe beforeEach_ it_ TestHelper __server afterEach beforeEach expect */
'use strict';
require(TEST_HELPER);
const sinon = require('sinon');
const Entry = require(`${__server}/models/entries`);
const Youtube = require(`${__server}/models/youtube`);
const request = require('supertest');
const ytOutput = require('../models/ytResult').output;
const ytBatchOutput = require('../models/ytBatchResult').output;
require('sinon-as-promised');
const Sessions = require(`${__server}/models/sessions`);

describe('The Entries API', () => {
  let app = null;
  let modelStub = null;
  const data = { id: 1, url: 'youtube.com/sxsw' };
  let sessionFetch = null;

  beforeEach_(function * generator() {
    app = TestHelper.createApp();
    sessionFetch = sinon.stub(Sessions, 'fetchByID');
    sessionFetch.resolves('test');
  });

  afterEach(() => {
    sessionFetch.restore();
    if (modelStub) modelStub.restore();
  });

  describe('GET /entries', () => {
    it_('returns all entries', function * testLinks() {
      modelStub = sinon.stub(Entry, 'getEntriesWithUsers');
      modelStub.resolves(data);
      yield request(app)
        .get('/api/yt/entries?offset=1&limit=12')
        .expect(200)
        .expect(response => {
          expect(response.body.data).to.deep.equal(data);
          expect(modelStub.calledWith(1, 12));
        });
    });

    it_('returns an error if an error is thrown in the server model', function * errorGetAll() {
      modelStub = sinon.stub(Entry, 'getEntriesWithUsers');
      modelStub.rejects('Database Read All Entries and Users error');
      yield request(app)
      .get('/api/yt/entries?offset=1&limit=12')
      .expect(200)
      .expect(response => {
        expect(response.body.error.message).to.equal('Database Read All Entries and Users error');
      });
    });
  });

  describe('DELETE /entries', () => {
    it_('deletes an entry', function * deletesLinks() {
      modelStub = sinon.stub(Entry, 'remove');
      modelStub.resolves({ success: true });
      const createdBy = sinon.stub(Entry, 'createdByUser');
      createdBy.resolves(true);
      yield request(app)
        .delete('/api/yt/entries/1')
        .expect(200)
        .expect(response => {
          expect(modelStub.calledWith('1')).to.equal(true);
          expect(response.body.data.success).to.equal(true);
        });
      createdBy.restore();
    });

    it_('returns an error if an error is thrown in the server model', function * errorDelete() {
      modelStub = sinon.stub(Entry, 'remove');
      modelStub.rejects('Attempted to delete invalid ID');
      const createdBy = sinon.stub(Entry, 'createdByUser');
      createdBy.resolves(true);
      yield request(app)
        .delete('/api/yt/entries/1111')
        .expect(200)
        .expect(response => {
          expect(response.body.error.message).to.equal('Attempted to delete invalid ID');
        });
      createdBy.restore();
    });
  });

  describe('PUT /entries', () => {
    it_('updates an entry', function * updateLink() {
      modelStub = sinon.stub(Entry, 'updateByID');
      modelStub.resolves(data);
      const isAllowed1 = sinon.stub(Entry, 'userIsAllowedAccess');
      isAllowed1.resolves(1);
      yield request(app)
        .put('/api/yt/entries/1')
        .expect(200)
        .expect(response => {
          expect(modelStub.calledWith('1')).to.equal(true);
          expect(response.body.data).to.include(data);
        });
      isAllowed1.restore();
    });

    it_('returns an error if an error thrown in the server model', function * updateError() {
      modelStub = sinon.stub(Entry, 'updateByID');
      modelStub.resolves(data);
      const notAllowed = sinon.stub(Entry, 'userIsAllowedAccess');
      notAllowed.rejects('Not allowed to edit this entry');
      yield request(app)
      .put('/api/yt/entries/1')
      .expect(200)
      .expect(response => {
        expect(response.body.error.message).to.equal('Not allowed to edit this entry');
      });
      notAllowed.restore();
    });
  });

  describe('POST /entries', () => {
    it_('posts a new entry', function * postsLinks() {
      modelStub = sinon.stub(Entry, 'create');
      modelStub.resolves(data);
      yield request(app)
        .post('/api/yt/entries')
        .expect(200)
        .expect(response => {
          expect(response.body.data).to.deep.equal(data);
        });
    });

    it_('returns an error when there is an error in the user model', function * errorPost() {
      modelStub = sinon.stub(Entry, 'create');
      modelStub.rejects('Database Create error');
      yield request(app)
      .post('/api/yt/entries')
      .expect(200)
      .expect(response => {
        expect(response.body.error.message).to.equal('Database Create error');
      });
    });
  });
});

describe('The Youtube API', () => {
  let app = null;
  const info = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';
  const badInfo = 'bit.ly/1pbHRQy';
  let sessionFetch = null;

  beforeEach(() => {
    app = TestHelper.createApp();
    sessionFetch = sinon.stub(Sessions, 'fetchByID');
    sessionFetch.resolves('test');
  });

  afterEach(() => {
    sessionFetch.restore();
  });

  describe('GET /api/yt/entries/info', () => {
    it_('gets video info from Youtube', function * getYTInfo() {
      const getInfo = sinon.stub(Youtube, 'getInfo');
      getInfo.resolves(ytOutput);
      yield request(app)
        .get('/api/yt/entries/info')
        .expect(200)
        .query({ url: info })
        .expect((response) => {
          expect(response.body.data).to.have.property('items');
          expect(Youtube.getInfo.calledOnce).to.equal(true);
        });
      getInfo.restore();
    });

    it_('sends an error when an invalid url is submitted', function * urlValid() {
      const getInfo = sinon.stub(Youtube, 'getInfo');
      getInfo.rejects(new Error('Invalid protocol'));
      yield request(app)
        .get('/api/yt/entries/info')
        .query({ url: badInfo })
        .expect(200)
        .expect((response) => {
          expect(response.body.error.message).to.equal('Invalid protocol');
          expect(Youtube.getInfo.calledOnce).to.equal(true);
        });
      getInfo.restore();
    });
  });

  describe('GET /api/yt/entries/refreshStats', () => {
    it_('gets mutiple videos info when passed array of URLs', function * getBatchYTInfo() {
      const getBatch = sinon.stub(Youtube, 'getBatchInfo');
      getBatch.resolves(ytBatchOutput);
      yield request(app)
        .get('/api/yt/entries/refreshStats')
        .expect(200)
        .expect(() => {
          expect(Youtube.getBatchInfo.calledOnce).to.equal(true);
        });
      getBatch.restore();
    });

    it_('returns an error if there is an error in the server model', function * getBatchError() {
      const getBatch = sinon.stub(Youtube, 'getBatchInfo');
      getBatch.rejects('Database Read Error: Invalid Url');
      yield request(app)
        .get('/api/yt/entries/refreshStats')
        .expect(200)
        .expect(response => {
          expect(response.body.error.message).to.equal('Database Read Error: Invalid Url');
        });
      getBatch.restore();
    });
  });
});

