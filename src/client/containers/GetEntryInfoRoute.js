import React, { Component, PropTypes } from 'react';
import GetEntryInfo from '../components/GetEntryInfo';
import actions from '../actionCreators/entries';
import { connect } from 'react-redux';


class GetEntryInfoRoute extends Component {
  render() {
    return <GetEntryInfo {...this.props} />;
  }
}

GetEntryInfoRoute.propTypes = {
  redirectIfNotLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { entries } = state.toJS();
  return {
    id: ownProps.params.id,
    infoIsLoading: entries.info.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (link) => {
      dispatch(actions.getEntryInfo(link));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetEntryInfoRoute);
