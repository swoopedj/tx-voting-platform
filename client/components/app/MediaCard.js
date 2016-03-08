const React = require('react');

const MediaCard = () => {
  return (
    <div className="column is-third">
    <div className="card">
      <div className="card-image">
        <figure className="image is-16by9">
          <img src="http://placehold.it/300x225&text=Video Thumb" alt="" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-32x32">
              <img className="is-round" src="http://placehold.it/64x64" alt="Image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5">John Smith</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
          <br />
          <small>11:09 PM - 1 Jan 2016</small>
        </div>
      </div>
    </div>
    </div>
  );
};

module.exports = MediaCard;
