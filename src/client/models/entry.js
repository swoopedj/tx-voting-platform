const request = require('../../lib/request.js');

const processData = (data) => {
  const videoData = data.data.items[0];
  const embedID = videoData.id;
  const title = videoData.snippet.title;
  const description = videoData.snippet.description;
  const statistics = videoData.statistics;
  const thumbnailURL = videoData.snippet.thumbnails.high.url;
  return {
    thumbnailURL,
    title,
    embedID,
    description,
    statistics,
  };
};

const Entry = {
  fetch: () => {
    return request.fetch('/api/yt/entries');
  },
  create: (entry) => {
    return request.fetch('/api/yt/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  },
  getInfo: (url) => {
    return request.fetch(request.addParams('http://localhost:4000/api/yt/entries/info', { url }))
      .then(processData);
  },
  delete: (id) => {
    return request.fetch(request.addParams('http://localhost:4000/api/yt/entries/', { id }), {
      method: 'DELETE',
    });
  },
};

module.exports = Entry;
