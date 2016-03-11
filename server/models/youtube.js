const Request = require('../lib/request');
const unshortener = require('../lib/unshortener');
const Url = require('url');

const Youtube = module.exports;
// const sample = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';

Youtube.getInfo = (url) => {
  'use strict';
  let shortenedUrl;
  const base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,player&id=';
  if (url.indexOf('youtube.com') !== -1) {
    shortenedUrl = Promise.resolve(url);
  } else {
    shortenedUrl = unshortener.expand(url);
  }
  return shortenedUrl.then(fullUrl => {
    const vidId = Url.parse(fullUrl, true).query.v;
    return `${base}${vidId}&key=${process.env.YOUTUBE_API_KEY}`;
  })
  .then((cleanUrl) => {
    return Request.fetch(cleanUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error('Something went wrong with the link provided:', error);
    });
  });
};
