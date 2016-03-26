import React, { Component, PropTypes } from 'react';
import Entries from '../components/Entries';
import { connect } from 'react-redux';
import actions from '../actionCreators/entries';
import { push } from 'react-router-redux';
import moment from 'moment';

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
  const entries = state.getIn(['entries', 'itemsByID'])
    .toList()
    .toJS()
    .sort((a, b) => {
      return moment(b.created_at).unix() - moment(a.created_at).unix();
    });
  const { isFetching, error } = state.toJS().entries;
  return {
    isLoading: isFetching,
    entries,
    error,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    fetchEntries: (offset = 0) => dispatch(actions.fetchEntries(offset)),
  };
};


EntriesRoute.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(EntriesRoute);
