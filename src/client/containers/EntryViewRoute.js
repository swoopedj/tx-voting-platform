import React, { Component, PropTypes } from 'react';
import EntryViewEdit from '../components/EntryViewEdit';
import { addEntry } from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewRoute extends Component {
  render() {
    return <EntryViewEdit {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.getIn(['entries', 'isSaving']),
    entry: state.getIn(['entries', 'info', 'data']).toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreatEntryClick: (entry) => {
      dispatch(addEntry(entry));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewRoute);
