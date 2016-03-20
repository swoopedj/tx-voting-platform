import React, { PropTypes } from 'react';
const EntryViewEdit = require('./EntryViewEdit');
const EntryViewShow = require('./EntryViewShow');

const EntryView = (props) => {
  if (props.inEditMode) return (<EntryViewEdit {...props} />);
  return (<EntryViewShow {...props} />);
};

EntryView.propTypes = {
  inEditMode: PropTypes.bool.isRequired,
};

module.exports = EntryView;
