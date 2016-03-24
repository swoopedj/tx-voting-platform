/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const User = require('../models/users.js');
const router = require('express').Router();
const responseHandler = require('../lib/responseHandler');

router.get('/:authID', (req, res) => {
  responseHandler.respond(User.findByAuthID(req.params.authID), res);
});

router.post('/:authID', (req, res) => {
  responseHandler.respond(User.insertOrUpdateUsingAuthID(req.params.authID, req.body), res);
});

router.delete('/:id', (req, res) => {
  responseHandler.respond(User.delete(req.params.id), res);
});

router.get('/entries/:id', (req, res) => {
  responseHandler.respond(User.getEntriesForUser(req.params.id), res);
});


module.exports = router;

