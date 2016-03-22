import React, { PropTypes } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import actions from '../actionCreators/users';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return state.get('user').toJS();
};

const matchDispatchToProps = (dispatch) => {
  return {
    populateUserData: () => dispatch(actions.populateUserData()),
  };
};


export const requireAuthentication = (Component) => {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.populateUserData();
    }
    render() {
      return <Component {...this.props} />;
    }
  }

  AuthenticatedComponent.propTypes = {
    populateUserData: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, matchDispatchToProps)(AuthenticatedComponent);
};
