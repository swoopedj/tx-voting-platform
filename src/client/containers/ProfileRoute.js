import React, { Component, PropTypes } from 'react';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import entryActions from '../actionCreators/entries';
import userActions from '../actionCreators/users';
import { push } from 'react-router-redux';

class ProfileRoute extends Component {
  componentDidMount() {
    this.props.populateProfileUser(this.props.authID);
    this.props.getEntriesForUser(this.props.authID);
  }
  componentWillReceiveProps(nextProps) {
    this.props.handleAuthID(this.props.authID, this.props.user);
    if (nextProps.authID !== this.props.authID) {
      this.props.populateProfileUser(nextProps.authID);
      this.props.getEntriesForUser(nextProps.authID);
    }
  }
  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const authID = ownProps.params.auth_id;
  const entries = state.getIn(['entriesForUser', 'itemsByID']).toList().toJS();
  const loggedInUser = state.getIn(['user', 'data']);
  const profileUser = (authID && authID === state.getIn(['user', 'data', 'authID'])) ? loggedInUser.toJS() : state.getIn(['profileUser', 'data']).toJS();
  const userStats = entries.reduce((stats, entry) => {
    stats.views = stats.views || 0;
    stats.likes = stats.likes || 0;
    stats.likes += parseInt(entry.statistics.likeCount, 0);
    stats.views += parseInt(entry.statistics.viewCount, 0);
    return stats;
  }, {});
  const entriesWithUsers = entries.map((entry) => {
    return {
      ...entry,
      user: profileUser,
    };
  });
  const { isFetching, error } = state.toJS().entries;
  return {
    isLoading: isFetching,
    authID,
    entries: entriesWithUsers,
    error,
    userStats,
    user: profileUser,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    populateProfileUser: (authID) => dispatch(userActions.populateProfileUser(authID)),
    getEntriesForUser: (authID) => dispatch(entryActions.getEntriesForUser(authID)),
    onLogoutClick: () => dispatch(userActions.logOut()),
    handleAuthID: (authID, user) => {
      if (!authID && !user.isLoggedIn && user.isPopulated) return dispatch(push('/login'));
      if (!authID && user.isPopulated) return dispatch(push(`/profile/${user.data.authID}`));

    },
  };
};

ProfileRoute.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  authID: PropTypes.string,
  getEntriesForUser: PropTypes.func.isRequired,
  populateProfileUser: PropTypes.func.isRequired,
  handleAuthID: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(ProfileRoute);
