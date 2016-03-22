const React = require('react');
const EntryCard = require('./EntryCard');

const Home = ({ entries, onCardClick }) => {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="container">
          hero
        </div>
      </div>
      <div className="container">
        <h1 className="title">Latest Entries</h1>
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
    </div>
  );
};

module.exports = Home;





