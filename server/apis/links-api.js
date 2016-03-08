/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const Link = require('../models/links.js');
const router = require('express').Router();
// These handle all of the requests to the database.

router.get('/', (req, res) => {
  Link.read()
   .then((links) => {
     res.json({ links });
   })
   .catch((error) => {
     console.log('ERROR: ', error);
   });
});

router.delete('/:id', (req, res) => {
  Link.remove(1) // req.body.id
  .then((link) => {
    res.json({ link });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });
});

router.put('/:id', (req, res) => {
  Link.update({ id: 1, url: 'youtube.com/ola' }) // req.body.id
  .then((link) => {
    res.json({ link });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });
});

router.post('/', (req, res) => {
  Link.create({ id: 5, url: 'youtube.com/ora' })
    .then((returnedLink) => {
      res.json({ returnedLink });
    });
});

module.exports = router;
