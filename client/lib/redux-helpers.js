const R = require('ramda');
const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    return R.propOr(R.identity, action.type, handlers)(state, action);
  }
};

const dispatchCallback = (response, dispatch, callback) => {
  const output = callback(response);
  if (Array.isArray(output)) {
    output.forEach(action => dispatch(action));
  } else {
    dispatch(output);
  }
};

// This helper is a general function for dispatching actions
// before a request, after a request returns, and if it returns with an error
const getAsyncAction = ({ dispatch, request, onRequest, onSuccess, onError }) => {
  dispatchCallback(undefined, dispatch, onRequest);
  return request()
    .then(response => dispatchCallback(response, dispatch, onSuccess))
    .catch(error => {
      dispatchCallback(error, dispatch, onError);
    });
};

module.exports = {
  createReducer,
  getAsyncAction,
};
