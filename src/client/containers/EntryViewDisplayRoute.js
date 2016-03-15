import React, { Component, PropTypes } from 'react';
import EntryViewDisplay from '../components/EntryViewDisplay';
import actions from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewDisplayRoute extends Component {
  componentDidMount() {
    this.props.fetchEntries(this.props.id);
  }
  render() {
    return <EntryViewDisplay {...this.props} />;
  }
}

EntryViewDisplayRoute.propTypes = {
  id: PropTypes.number.isRequired,
  fetchEntries: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.params.id, 0);
  const currentEntry = actions.findEntryByID(state.get('entries'), id).toJS();
  console.log(currentEntry);
  return {
    id,
    isSaving: currentEntry.isSaving,
    entry: currentEntry.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEntries: (id) => dispatch(actions.fetchIfNeeded(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewDisplayRoute);
