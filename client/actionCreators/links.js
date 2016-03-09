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
    type: 'RECEIVE_LINK_INFO_ERROR',
    error,
  };
}

function requestNewLink(link) {
  return {
    type: 'REQUEST_NEW_LINK',
    link,
  };
}

function receiveNewLink() {
  return {
    type: 'RECEIVE_NEW_LINK',
  };
}

function getLinkInfo(url) {
  return dispatch => getAsyncAction({
    dispatch,
    request: Link.getInfo(url),
    onRequest: () => requestLinkInfo(url),
    onSuccess: (info) => receiveLinkInfo(info),
    onError: (error) => receiveLinkInfoError(error),
  });
}

module.exports = {
  requestLinkInfo,
  requestNewLink,
  receiveNewLink,
  receiveLinkInfoError,
  receiveLinkInfo,
  getLinkInfo,
};
