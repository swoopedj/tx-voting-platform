const React = require('react');
import { Link } from 'react-router';
const EntryCard = require('./EntryCard');

const Home = ({ entries, onCardClick }) => {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-quarter">
              <div className="intro is-text-centered">
                <h2 className="title is-3">Supporting political activism for all Texans through social media and maybe some emojis.
                </h2>
                <button className="button is-primary is-large is-primary">Submit Your Entry</button>
                <br />
                <br />
                <Link to="/about">About Us</Link><i className="fa fa-star-o"></i><Link to="/login">Sign Up</Link>
              </div>
            </div>
          </div>
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





