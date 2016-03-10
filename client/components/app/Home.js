const React = require('react');
const MediaCard = require('./MediaCard');

const videos = [

];

const Home = ({ links }) => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns is-multiline">
        { links.map(link =>
          <MediaCard
            key={link.id}
            {...link}
          />
        )}
      </div>
    </div>
  );
};

module.exports = Home;





