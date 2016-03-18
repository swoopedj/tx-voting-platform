const React = require('react');
const EntryAuthor = require('./EntryAuthor');

const EntryViewDisplay = ({ entry }) => {
  return (
    <div className="columns">
      <div className="column is-8">
        <div className="box">
          <div className="video-wrapper">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${entry.embedID}`} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <p className="title is-5 is-pad-15">{entry.description}</p>
      </div>
      <div className="column is-4">
        <div className="big-data">
          <p className="title is-3 entry-title">{entry.title}</p>
          <EntryAuthor />
          <hr />
          <h3 className="title is-6 heading"><i className="fa fa-bar-chart"></i>&nbsp;Stats</h3>
          <div className="columns">
            <div className="column is-half">
              <p className="number">21,233</p>
              <small>Views</small>
            </div>
            <div className="column is-half">
              <p className="number">33</p>
              <small>Likes</small>
            </div>
          </div>
          <hr />
          <h3 className="title is-6 heading"><i className="fa fa-youtube"></i>&nbsp;YouTube</h3>  
          <a href={`https://youtu.be/${entry.embedID}`}>youtu.be/{entry.embedID}</a>
        </div>
      </div>
    </div>
  );
};

module.exports = EntryViewDisplay;
