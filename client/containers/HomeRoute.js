import React, { Component, PropTypes } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import actions from '../actionCreators/links';

class HomeRoute extends Component {
  componentDidMount() {
    const { fetchLinks } = this.props;
    fetchLinks();
  }
  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { isLoading, items, error } = state.toJS().links;
  return {
    isLoading,
    links: items,
    error,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    fetchLinks: () => dispatch(actions.fetchLinks()),
  };
};


HomeRoute.propTypes = {
  fetchLinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeRoute);
