import React, { Component, PropTypes } from 'react';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import entryActions from '../actionCreators/entries';
import userActions from '../actionCreators/users';

class ProfileRoute extends Component {
  componentDidMount() {
    // const { fetchEntries } = this.props;
    // fetchEntries();
  }
  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const authID = ownProps.params.auth_id;
  const entries = state.getIn(['entries', 'itemsByID']).toList().toJS();
  const user = state.get('user').toJS();
  const { isFetching, error } = state.toJS().entries;
  return {
    isLoading: isFetching,
    authID,
    entries,
    error,
    user,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => dispatch(userActions.logOut()),
  };
};


ProfileRoute.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(ProfileRoute);
