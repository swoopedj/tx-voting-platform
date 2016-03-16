import React, { Component, PropTypes } from 'react';
import EntryViewEdit from '../components/EntryViewEdit';
import actions from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewCreateRoute extends Component {
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
      dispatch(actions.addEntryAndRedirect(entry, '/'));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewCreateRoute);
