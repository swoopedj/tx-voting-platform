import React, { Component, PropTypes } from 'react';
import GetEntryInfo from '../components/GetEntryInfo';
import { connect } from 'react-redux';

class GetEntryInfoRoute extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <GetEntryInfo {...this.props} />;
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBack: () => {
      dispatch(push('/'));
    },
  };
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(GetEntryInfoRoute);
