const Request = require('../lib/request');
const Youtube = module.exports;
const Config = require('../../config');


// const sample = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';


Youtube.getInfo = (url) => {
  const base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,player&id=';

  const vidId = url.slice(url.indexOf('v=') + 2);
  const newUrl = `${base}${vidId}&key=${Config.key}`;
  return Request.fetch(newUrl)
  .catch((error) => {
    console.log('ERROR:', error);
  });
  //  relevant response info

  // pass relevant response info into Link.create
};

// Youtube.getInfo(sample);
