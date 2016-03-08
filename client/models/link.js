const ModelMocker = require('../lib/model-mocker');
const mockData = {
  mocks: [
    {
      title: 'A Title',
      description: 'This is some stuff about the link',
      url: 'http://www.google.com',
      stats: {
        views: 500,
      },
    },
  ],
  delay: 100,
};

const MockLink = new ModelMocker(mockData);
const linkInfo = {
  title: 'prebuilt stuff',
  description: 'description',
  stats: {
    views: 500,
  },
};

const Link = {
  fetch: () => MockLink.read(),
  create: (link) => MockLink.create(link),
  getInfo: () => {
    return Promise.resolve(linkInfo);
  },
};

module.exports = Link;
