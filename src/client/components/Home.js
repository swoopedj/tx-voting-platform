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
                <h2 className="title is-4">Enter the<br /><strong>Texans.Vote 2016 Get Out the Vote Contest</strong> and wield the power of social media to motivate Texans to vote in 2016.
                </h2>
                <Link to="/entry/new" className="button is-primary is-large">Submit Your Entry</Link>
                <br />
                <br />
                <Link to="/about">About Us</Link><i className="fa fa-star-o"></i><Link to="/login">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="box entry-cards-wrapper">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title has-icon"><i className="fa fa-youtube"></i>&nbsp;Latest Entries</h1>
            </div>
            <div className="column is-half is-text-right">
              <Link to="/entries">More Entries&nbsp;<i className="fa fa-arrow-right"></i></Link>
            </div>
          </div>
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
    </div>
  );
};

module.exports = Home;





