const responseHandler = {
  respond: (promise, res) => {
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
  },
};

module.exports = responseHandler;
