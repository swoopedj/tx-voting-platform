/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const User = require('../models/users.js');
const router = require('express').Router();
const { respond } = require('../lib/responseHandler');

router.get('/:authID', (req, res) => {
  respond(req, res, {
    getResponse: () => {
      return User.findByAuthID(req.params.authID);
    },
  });
});

router.post('/:authID', (req, res) => {
  respond(req, res, {
    getResponse: () => {
      return User.login(req.params.authID, req.body);
    },
  }); 
});

router.delete('/:id', (req, res) => {
  respond(req, res, {
    isSecured: true,
    getResponse: () => {
      return User.delete(req.params.id);
    },
    validateSession: () => {
      return Promise.resolve(true);
    },
  });
});

router.get('/entries/:id', (req, res) => {
  respond(req, res, {
    getResponse: () => {
      return User.getEntriesForUser(req.params.id);
    },
  });
});


module.exports = router;

