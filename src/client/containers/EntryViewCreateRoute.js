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
    isSaving: state.getIn(['entries', 'isAddingNew']),
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

EntryViewCreateRoute.PropTypes = {
  entry: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewCreateRoute);
