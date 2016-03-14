import React, { Component, PropTypes } from 'react';
import EntryViewDisplay from '../components/EntryViewDisplay';
import { getEntryInfo } from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewDisplayRoute extends Component {
  render() {
    return <EntryViewDisplay {...this.props} />;
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
    onClick: () => {
      dispatch(getEntryInfo(link));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewDisplayRoute);
