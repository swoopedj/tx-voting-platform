const React = require('react');
const EntryCard = require('./EntryCard');

const Home = ({ entries, onCardClick }) => {
  return (
    <div>
      <h2>YouTube</h2>
      <div className="columns is-multiline">
        { entries.map(entry =>
          <EntryCard
            key={entry.id}
            entry={entry}
            onClick={(event) => onCardClick(event, entry)}
          />
        )}
      </div>
    </div>
  );
};

module.exports = Home;





