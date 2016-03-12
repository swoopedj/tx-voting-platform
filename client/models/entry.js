const ModelMocker = require('../lib/model-mocker');
const request = require('../lib/request.js');
const mockData = {
  mocks: [
    {
      embedID: 'fICcd-okQEs',
      thumbnailURL: 'https://i.ytimg.com/vi/fICcd-okQEs/hqdefault.jpg',
      publishedAt: '2010-03-23T07:25:42.000Z',
      title: '#CareLikeCrazy About Student Loans',
      description: "Do you #CareLikeCrazy about voting rights? Women's rights? The environment? ↵We all have a reason to care, we all have a reason to vote. Whatever yours is, make sure you're registered: carelikecrazy.com/register",
    },
  ],
  delay: 100,
};

const MockEntry = new ModelMocker(mockData);
const entryInfo = {
  title: 'prebuilt stuff',
  description: 'description',
  stats: {
    views: 500,
  },
};

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
  fetch: () => MockEntry.read(),
  create: (link) => MockEntry.create(link),
  getInfo: (url) => {
    return request.fetch(request.addParams('http://localhost:4000/api/yt/links/info', { url }))
      .then(response => response.json())
      .then(processData);
  },
};

module.exports = Entry;
