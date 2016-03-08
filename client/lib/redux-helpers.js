const R = require('ramda');
const createReducer = (initialState, handlers) => {
  return (state = initialState, action) =>
    R.propOr(R.identity, action.type, handlers)(state, action);
};

const getAsyncAction = ({ dispatch, promise, onInitial, onSuccess, onError }) => {
  dispatch(onInitial);
  return promise
    .then(response => dispatch(onSuccess(response)))
    .catch(error => dispatch(onError(error)));
};

module.exports = {
  createReducer,
  getAsyncAction,
};
