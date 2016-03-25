import React, { Component, PropTypes } from 'react';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import entryActions from '../actionCreators/entries';
import userActions from '../actionCreators/users';
import { push } from 'react-router-redux';

class ProfileRoute extends Component {
  componentWillReceiveProps() {
    this.props.handleAuthID(this.props.authID, this.props.user);
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
    handleAuthID: (authID, user) => {
      if (!authID && !user.isLoggedIn) return dispatch(push('/login'));
      if (!authID) dispatch(push(`/profile/${user.data.authID}`));
    },
  };
};

ProfileRoute.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(ProfileRoute);
