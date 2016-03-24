import React, { Component, PropTypes } from 'react';
import EntryView from '../components/EntryView';
import actions from '../actionCreators/entries';
import { connect } from 'react-redux';

class EntryViewRoute extends Component {
  componentDidMount() {
    this.props.fetchEntries(this.props.id);
  }
  render() {
    const props = this.props;
    return <EntryView {...props} />;
  }
}

EntryViewRoute.propTypes = {
  id: PropTypes.number.isRequired,
  inputFields: PropTypes.object.isRequired,
  isWorking: PropTypes.bool.isRequired,
  fetchEntries: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescripitionChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return actions.getEntryViewProps(state, ownProps.params);
};

const onFieldChange = (dispatch, fieldName) => {
  return event => dispatch(actions.changeEntryInputField(fieldName, event.target.value));
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: (id) => dispatch(actions.tryToDeleteEntry(id)),
    fetchEntries: (id) => dispatch(actions.fetchIfNeeded(id)),
    onTitleChange: onFieldChange(dispatch, 'title'),
    onDescriptionChange: onFieldChange(dispatch, 'description'),
    updateEntry: (id, inputFields) => {
      dispatch(actions.updateEntry(id, inputFields));
    },
    createEntry: (entry, userID) => {
      dispatch(actions.addEntryAndRedirect(entry, userID, '/'));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryViewRoute);
