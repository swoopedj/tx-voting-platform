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
  Entry.remove(req.params.id)
  .then((entry) => {
    res.json({ entry });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });
});

router.put('/:id', (req, res) => {
  responseHandler.respond(Entry.updateByID(req.params.id), res);
  // Entry.update(req.params.id) // req.body.id
  // .then((entry) => {
  //   res.json({ entry });
  // })
  // .catch((error) => {
  //   console.log('ERROR: ', error);
  // });
});

router.post('/', (req, res) => {
  responseHandler.respond(Entry.create(req.body), res);
  // Entry.create(req.body)
  //   .then((returnedEntry) => {
  //     res.json({ returnedEntry });
  //   });
});

router.get('/info', (req, res) => {
  responseHandler.respond(Youtube.getInfo(req.query.url), res);
//   Youtube.getInfo(req.query.url)

//   .then((data) => {
//     if (!data.items[0]) {
//       res.status(500).send('That youtube URL is invalid');
//     }
//     res.json({ data });
//   })
//   .catch((error) => {
//     if (error.statusCode === 404) {
//       res.status(404).send('That youtube video is not found.');
//     }
//     res.status(500).send(error.message);
//   });
});

module.exports = router;
