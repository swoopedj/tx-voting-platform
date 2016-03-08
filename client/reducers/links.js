const Immutable = require('immutable');
const { createReducer } = require('../lib/redux-helpers');

// FIXME: ESLint
const isLinkInfoLoading = createReducer(false, {
  REQUEST_LINK_INFO: () => true,
});

const currentLink = createReducer(null, {
  RECEIVE_LINK_INFO: (state, action) => {
    return Immutable.fromJS(action.data);
  },
});

module.exports = {
  isLinkInfoLoading,
  currentLink,
};
