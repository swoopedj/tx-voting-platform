const Sessions = require('../models/sessions');
const generateResponse = (promise, res) => {
  promise
    .then(data => {
      return {
        data,
        error: null,
      };
    })
    .catch(error => {
      return {
        data: [],
        error: {
          code: error.statusCode,
          message: error.message,
        },
      };
    })
    .then(output => {
      res.json(output);
  });
};

const responseHandler = {
  respond: (req, res, promise, isSecured, confirmSession) => {
    const confirmSessionPromise = confirmSession === undefined ? () => Promise.resolve(true) : confirmSession;
    let securePromise = promise;
    if (isSecured) {
      securePromise = Sessions.fetchByID(req.headers['session-id']).then(session => {
        return confirmSessionPromise(session).then(() => {
          return promise;
        });
      });
    }
    generateResponse(securePromise, res);
  },
};

module.exports = responseHandler;
