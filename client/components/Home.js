const React = require('react');
const EntryCard = require('./EntryCard');

const Home = ({ links }) => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns is-multiline">
        { links.map(link =>
          <EntryCard
            key={link.id}
            {...link}
          />
        )}
      </div>
    </div>
  );
};

module.exports = Home;





