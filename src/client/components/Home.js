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
      <div className="home-section-signup">
        <div className="columns">
          <div className="column is-half is-offset-quarter is-text-centered">
            <h3 className="title is-4">Create a <strong>Get Out the Vote</strong> video and then promote it far and wide. Every view your video gets will earn you a chance to win cash and prizes!</h3>
            <Link to="/entry/new" className="button is-primary is-large">Enter Now!</Link>
          </div>
        </div>
      </div>
      <div className="home-section-info">
        <div className="container">
          <div className="columns">
            <div className="column is-5">
              <h2 className="title">Why a Get Out the Vote contest?</h2>
              <p className="title is-5">Texas consistently ranks between dead-last and 47th among all 50 states in voter participation.</p>
              <p className="title is-5">
                <strong>We can do better and elect politicians that truly represent all Texans.</strong>
              </p>
              <p className="title is-5">
                <br />
                <a href="#" className="button is-large is-primary">Register To Vote</a>
              </p>
            </div>
            <div className="column is-7">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <section className="hero is-danger">
        <div className="hero-content">
          <div className="container">
            <h1 className="title">
              Show your love for Texas and help<br />Get Out the Vote!
            </h1>
            <h2 className="title">
              <i className="fa fa-heart"></i>
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

module.exports = Home;





