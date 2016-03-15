import React, { Component, PropTypes } from 'react';
import EntryView from '../components/EntryView';
import actions from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewRoute extends Component {
  componentDidMount() {
    this.props.fetchEntries(this.props.id);
  }
  render() {
    console.log(this.props);
    return <EntryView {...this.props} />;
  }
}

EntryViewRoute.propTypes = {
  id: PropTypes.number.isRequired,
  fetchEntries: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.params.id, 0);
  const isEdit = ownProps.params.is_edit;
  const entry = actions.findEntryByID(state.get('entries'), id).toJS();
  console.log(entry);
  return {
    id,
    inEditMode: isEdit === 'edit',
    isSaving: state.getIn(['entries', 'isSaving']),
    entry,
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
)(EntryViewRoute);
