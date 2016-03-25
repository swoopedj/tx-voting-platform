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
  componentDidMount() {
    if(this.props.authID) {
      console.log('firing');
      this.props.getEntriesForUser(this.props.authID);
    }
  }
  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const authID = ownProps.params.auth_id;
  const entries = state.getIn(['entriesForUser', 'itemsByID']).toList().toJS();
  const user = state.get('user').toJS();
  const userStats = entries.reduce((stats, entry) => {
    stats.views = stats.views || 0;
    stats.likes = stats.likes || 0;
    stats.likes += parseInt(entry.statistics.viewCount, 0);
    stats.views += parseInt(entry.statistics.likeCount, 0);
    return stats;
  }, {});
  const entriesWithUsers = entries.map((entry) => {
    return {
      ...entry,
      user: user.data,
    };
  });
  
  const { isFetching, error } = state.toJS().entries;
  return {
    isLoading: isFetching,
    authID,
    entries : entriesWithUsers,
    error,
    userStats,
    user,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    getEntriesForUser: (authID) => dispatch(entryActions.getEntriesForUser(authID)),
    onLogoutClick: () => dispatch(userActions.logOut()),
    handleAuthID: (authID, user) => {
      if (!authID && !user.isLoggedIn && user.isPopulated) return dispatch(push('/login'));
      if (!authID && user.isPopulated) dispatch(push(`/profile/${user.data.authID}`));
    },
  };
};

ProfileRoute.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(ProfileRoute);
