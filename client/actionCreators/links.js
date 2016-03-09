const { getAsyncAction } = require('../lib/redux-helpers');
require('es6-promise').polyfill();
const Link = require('../models/link');

function requestLinks() {
  return {
    type: 'REQUEST_LINKS',
  };
}

function receiveLinks(links) {
  return {
    type: 'RECEIVE_LINKS',
    links,
  };
}

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

function receiveNewLinkError(error) {
  return {
    type: 'RECEIVE_NEW_LINK_ERROR',
    error,
  };
}

function receiveLinksError(error) {
  return {
    type: 'RECEIVE_LINKS_ERROR',
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

function addLink(link) {
  return dispatch => getAsyncAction({
    dispatch,
    request: Link.create(link),
    onRequest: () => requestNewLink(),
    onSuccess: () => receiveNewLink(),
    onError: (error) => receiveNewLinkError(error),
  });
}


module.exports = {
  requestLinks,
  addLink,
  receiveLinksError,
  receiveLinks,
  requestLinkInfo,
  requestNewLink,
  receiveNewLink,
  receiveNewLinkError,
  receiveLinkInfoError,
  receiveLinkInfo,
  getLinkInfo,
};
