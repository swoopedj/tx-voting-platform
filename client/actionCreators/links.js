const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Link = require('../models/link');

function requestLinkInfo(url) {
  return {
    type: 'REQUEST_LINK_INFO',
    url,
  };
}

function receiveLinkInfo(data) {
  return {
    type: 'RECEIVE_LINK_INFO',
    data,
  };
}

function receiveLinkInfoError(error) {
  return {
    type : 'RECEIVE_LINK_INFO_ERROR',
    error,
  };
}

function getLinkInfo(url) {
  return dispatch => getAsyncAction({
    dispatch,
    promise: Link.getInfo(url),
    initial: () => requestLinkInfo(url),
    success: (info) => receiveLinkInfo(info),
    error: (error) => receiveLinkInfoError(error),
  });
}

module.exports = {
  requestLinkInfo,
  receiveLinkInfo,
  getLinkInfo,
};
