import React, { Component, PropTypes } from 'react';
import Login from '../components/Login';
import { connect } from 'react-redux';
import actions from '../actionCreators/users';
import { push } from 'react-router-redux';

class LoginRoute extends Component {
  componentDidMount() {
    
  }
  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const user = state.get('user');
  return {
    isLoggedIn: user.get('isLoggedIn'),
    isFetching: user.get('isFetching'),
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => dispatch(actions.login()),
  };
};


LoginRoute.propTypes = {

};

export default connect(mapStateToProps, matchDispatchToProps)(LoginRoute);
