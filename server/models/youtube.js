const fetch = require('isomorphic-fetch');
const Youtube = module.exports;
const config = require('../../config');

const sample = 'https://www.youtube.com/watch?v=FzRH3iTQPrk';


Youtube.getInfo = (url) => {
  const base = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics, player&id=';

  const newUrl = url.slice(url.indexOf('v=') + 2);

  fetch(`${base},${newUrl},'&key=',${config.Key}`)
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });
  //  relevant response info

  // pass relevant response info into Link.create
};

Youtube.getInfo(sample);
