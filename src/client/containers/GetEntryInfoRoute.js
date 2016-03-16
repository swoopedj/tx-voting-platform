import React, { Component, PropTypes } from 'react';
import GetEntryInfo from '../components/GetEntryInfo';
import { getEntryInfo } from '../actionCreators/entries';
import { connect } from 'react-redux';

class GetEntryInfoRoute extends Component {
  render() {
    return <GetEntryInfo {...this.props} />;
  }
}


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
      dispatch(getEntryInfo(link));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetEntryInfoRoute);
