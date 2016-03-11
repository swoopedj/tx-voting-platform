import React, { Component, PropTypes } from 'react';
import EntryViewEdit from '../components/EntryViewEdit';
import { getEntryInfo } from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewRoute extends Component {
  render() {
    return <EntryViewEdit {...this.props} />;
  }
}


const mapStateToProps = (state, ownProps) => {
  const { currentEntry } = state.toJS();
  console.log('current Entry in entryiew', currentEntry);
  return {
    id: ownProps.params.id,
    isSaving: currentEntry.isSaving,
    ...currentEntry.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreatEntryClick: () => {
      console.log('firing');
      // dispatch(getEntryInfo(link));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewRoute);
