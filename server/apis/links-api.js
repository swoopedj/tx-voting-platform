/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const Link = require('../models/links.js');
const router = require('express').Router();
const Youtube = require('../models/youtube.js');
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
  Link.remove(req.params.id)
  .then((link) => {
    res.json({ link });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });
});

router.put('/:id', (req, res) => {
  Link.update(req.params.id) // req.body.id
  .then((link) => {
    res.json({ link });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });
});

router.post('/', (req, res) => {
  Link.create(req.body)
    .then((returnedLink) => {
      res.json({ returnedLink });
    });
});

router.get('/info', (req, res) => {
  Youtube.getInfo(req.query.url)
  .then((data) => {
    if (!data.items[0]) {
      res.status(500).send('That youtube URL is invalid');
    }
    console.log('IS THIS REAL', data.items);
    res.json({ data });
  })
  .catch((error) => {
    console.log('ERROR IN LINKS API', error);
    if (error.statusCode === 404) {
      res.status(404).send('That youtube URL is not found.');
    }
    res.status(500).send(error.message);
  });
});

module.exports = router;
