import React, { Component, PropTypes } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import actions from '../actionCreators/entries';
import { push } from 'react-router-redux';
import moment from 'moment';

class HomeRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { fetchEntries } = this.props;
    fetchEntries();
  }
  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const entries = state.getIn(['entries', 'itemsByID'])
    .toList()
    .toJS()
    .sort((a, b) => {
      return moment(b.created_at).unix() - moment(a.created_at).unix();
    })
    .slice(0, 6);
  const { isFetching, error, user } = state.toJS().entries;
  return {
    isLoading: isFetching,
    entries,
    error,
    user,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    fetchEntries: () => dispatch(actions.fetchEntries()),
  };
};


HomeRoute.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeRoute);
