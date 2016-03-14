import React, { Component, PropTypes } from 'react';
import EntryViewEdit from '../components/EntryViewEdit';
import { addEntry } from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewRoute extends Component {
  render() {
    return <EntryViewEdit {...this.props} />;
  }
}


const mapStateToProps = (state, ownProps) => {
  const { currentEntry } = state.toJS();
  return {
    id: ownProps.params.id,
    isSaving: currentEntry.isSaving,
    entry: currentEntry.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreatEntryClick: (entry) => {
      console.log(entry);
      dispatch(addEntry(entry));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewRoute);
