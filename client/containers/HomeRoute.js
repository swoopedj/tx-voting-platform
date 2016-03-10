import React, { Component, PropTypes } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import actions from '../actionCreators/entries';

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
  const { isLoading, items, error } = state.toJS().entries;
  return {
    isLoading,
    links: items,
    error,
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
