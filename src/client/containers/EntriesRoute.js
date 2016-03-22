import React, { Component, PropTypes } from 'react';
import Entries from '../components/Entries';
import { connect } from 'react-redux';
import actions from '../actionCreators/entries';
import { push } from 'react-router-redux';

class EntriesRoute extends Component {
  componentDidMount() {
    const { fetchEntries } = this.props;
    fetchEntries();
  }
  render() {
    return <Entries {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { isFetching, items, error } = state.toJS().entries;
  return {
    isLoading: isFetching,
    entries: items,
    error,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    fetchEntries: () => dispatch(actions.fetchEntries()),
  };
};


EntriesRoute.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(EntriesRoute);
