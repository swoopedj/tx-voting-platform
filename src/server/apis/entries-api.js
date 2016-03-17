/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const Entry = require('../models/entries.js');
const router = require('express').Router();
const Youtube = require('../models/youtube.js');
const responseHandler = require('../lib/responseHandler');
// These handle all of the requests to the database.

router.get('/', (req, res) => {
  responseHandler.respond(Entry.read(), res);
});

router.delete('/:id', (req, res) => {
  responseHandler.respond(Entry.remove(req.params.id), res);
});

router.put('/:id', (req, res) => {
  responseHandler.respond(Entry.updateByID(req.params.id), res);
});

router.post('/', (req, res) => {
  responseHandler.respond(Entry.create(req.body), res);
});

router.get('/info', (req, res) => {
  responseHandler.respond(Youtube.getInfo(req.query.url), res);
});

module.exports = router;
