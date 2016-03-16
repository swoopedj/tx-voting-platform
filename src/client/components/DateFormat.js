import React, { PropTypes } from 'react';
import moment from 'moment';

const DateFormat = ({ pubDate }) => {
  return (
    <span>{moment(pubDate).format('MMM Do YYYY')}</span>
  );
};

DateFormat.propTypes = {
  pubDate: PropTypes.string.isRequired,
};

module.exports = DateFormat;
