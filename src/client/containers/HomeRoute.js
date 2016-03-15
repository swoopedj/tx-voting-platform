import React, { Component, PropTypes } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import actions from '../actionCreators/entries';
import { push } from 'react-router-redux';

class HomeRoute extends Component {
  componentDidMount() {
    const { fetchEntries } = this.props;
    fetchEntries();
  }
  render() {
    return <Home {...this.props} />;
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
    onCardClick: (event, entry) => {
      event.preventDefault();
      dispatch(actions.setEntryAsCurrent(entry));
      dispatch(push(`/entry/yt/${entry.id}`));
    }
  };
};


HomeRoute.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeRoute);
