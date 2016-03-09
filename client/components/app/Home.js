const React = require('react');
const MediaCard = require('./MediaCard');

const videos = [
  {
    id: 'Hh2UGLQsNqs',
    data: {
      publishedAt: '2010-03-23T07:25:42.000Z',
      title: 'WCW Nitro: March 16th 1998: Goldberg vs. Lodi',
      description: 'Goldberg takes on The Flock\'s resident sign man.',
    },
  },
  {
    id: 'OPf0YbXqDm0',
    data: {
      publishedAt: '2014-11-19T14:00:18.000Z',
      title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
      description: 'Mark Ronson\'s official music video for "Uptown Funk" ft. Bruno Mars.',
    },
  },
];

const Home = () => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns is-multiline">
        { videos.map(video =>
          <MediaCard
            key={video.id}
            {...video}
          />
        )}
      </div>
    </div>
  );
};

module.exports = Home;





