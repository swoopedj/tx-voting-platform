const React = require('react');
const MediaCard = require('./MediaCard');
const Home = () => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns">
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
    </div>
  );
};

module.exports = Home;





