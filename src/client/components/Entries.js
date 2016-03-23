import React from 'react';
import EntryCard from './EntryCard';

const Entries = ({ entries, onCardClick }) => {
  return (
    <div className="container">
      <h1 className="title is-3">Entries</h1>
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

module.exports = Entries;
