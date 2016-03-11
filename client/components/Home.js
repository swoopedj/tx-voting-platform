const React = require('react');
const EntryCard = require('./EntryCard');

const Home = ({ links, onCardClick }) => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns is-multiline">
        { links.map(link =>
          <EntryCard
            key={link.id}
            entry={link}
            onClick={(event) => onCardClick(event, link)}
          />
        )}
      </div>
    </div>
  );
};

module.exports = Home;





