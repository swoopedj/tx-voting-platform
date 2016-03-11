const ModelMocker = require('../lib/model-mocker');
const request = require('../lib/request.js');
const mockData = {
  mocks: [
    {
      publishedAt: '2010-03-23T07:25:42.000Z',
      title: 'WCW Nitro: March 16th 1998: Goldberg vs. Lodi',
      description: 'Goldberg takes on The Flock\'s resident sign man.',
    },
    {
      publishedAt: '2014-11-19T14:00:18.000Z',
      title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
      description: 'Mark Ronson\'s official music video for "Uptown Funk" ft. Bruno Mars.',
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
  const title = videoData.snippet.title;
  const embedHTML = videoData.player.embedHtml;
  const description = videoData.snippet.description;
  const statistics = videoData.statistics;
  return {
    title,
    embedHTML,
    description,
    statistics,
  };
}

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
