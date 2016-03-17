import React, { PropTypes } from 'react';
const EntryViewEdit = require('./EntryViewEdit');
const EntryViewDisplay = require('./EntryViewDisplay');

const EntryView = ({ inEditMode, entry, isSaving }) => {
  if (inEditMode) return (<EntryViewEdit isSaving={isSaving} entry={entry} />);
  return (<EntryViewDisplay entry={entry} />);
};

EntryView.propTypes = {
  inEditMode: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

module.exports = EntryView;
