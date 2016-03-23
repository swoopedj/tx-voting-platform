/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const Entry = require('../models/entries.js');
const router = require('express').Router();
const Youtube = require('../models/youtube.js');
const respond = require('../lib/responseHandler').respond;
// These handle all of the requests to the database.

router.get('/', (req, res) => {
  respond(Entry.getEntriesWithUsers(req.query.offset, req.query.limit), res);
});

router.delete('/:id', (req, res) => {
  respond(Entry.remove(req.params.id), res);
});

router.put('/:id', (req, res) => {
  respond(Entry.updateByID(req.params.id, req.body), res);
});

router.post('/', (req, res) => {
  respond(Entry.create(req.body), res);
});

router.get('/info', (req, res) => {
  respond(Youtube.getInfo(req.query.url), res);
});

module.exports = router;
