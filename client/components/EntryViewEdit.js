import React, { PropTypes } from 'react';

const EntryViewEdit = ({ isSaving, onCreatEntryClick, title, description, embedHtml }) => {
  return (
    <div className="columns">
      <div className="column is-8 is-offset-2">
        <div className="box">
          <div className="video-wrapper">
            {embedHtml}
          </div>
        </div>
        <br /><br />
        <p className="control">
          <input className="input is-large" type="text" value={title} />
        </p>
        <p className="control">
          <textarea className="textarea">{description}</textarea>
        </p>
        <p className="control">
          <button onCreatEntryClick={onCreatEntryClick} className="button is-primary">Create Entry</button>
          &nbsp;
          <a href="/entry/new" className="button">Cancel</a>
        </p>
      </div>
    </div>
  );
};

EntryViewEdit.propTypes = {
  onCreatEntryClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

module.exports = EntryViewEdit;
