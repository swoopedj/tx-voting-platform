import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../actionCreators/users';

const mapStateToProps = (state) => {
  return state.get('user').toJS();
};

const matchDispatchToProps = (dispatch) => {
  return {
    redirectIfNotLoggedIn: () => dispatch(actions.redirectIfNotLoggedIn()),
  };
};


export const requireAuthentication = (Component) => {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.props.redirectIfNotLoggedIn();
    }
    render() {
      return <Component {...this.props} />;
    }
  }

  AuthenticatedComponent.propTypes = {
    redirectIfNotLoggedIn: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, matchDispatchToProps)(AuthenticatedComponent);
};
