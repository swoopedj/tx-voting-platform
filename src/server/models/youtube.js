const Request = require('../../lib/request');
const unshortener = require('../lib/unshortener');
const Url = require('url');

const Youtube = module.exports;
const base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,player&id=';
Youtube.getInfo = (url) => {
  'use strict';
  let shortenedUrl;
  if (url.indexOf('youtube.com') !== -1) {
    shortenedUrl = Promise.resolve(url);
  } else {
    shortenedUrl = unshortener.expand(url).catch(error => {
      if (error.message === 'Invalid protocol') throw new Error(`invalid entry url: ${url}`);
      else throw new Error('there was a problem on the server');
    });
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
  })
  .then(youtubeResponse => {
    if (youtubeResponse.items.length === 0) {
      throw new Error(`YouTube url: ${url} is invalid`);
    }
    return youtubeResponse;
  });
};

Youtube.getBatchInfo = (urlArray) => {
  const idString = urlArray.map((url) => {
    return Url.parse(url, true).query.v;
  }).join(',');

  const cleanUrl = `${base}${idString}&key=${process.env.YOUTUBE_API_KEY}`;

  return Request.fetch(cleanUrl)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    throw new Error('Something went wrong with the provided urls:', error);
  });
};
