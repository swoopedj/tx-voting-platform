import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import entryActions from '../actionCreators/entries';
import flashMessageActions from '../actionCreators/flashMessage';
import userActions from '../actionCreators/users';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlashMessage from '../components/FlashMessage';

class App extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.flashMessage.isVisible && !this.props.flashMessage.isVisible) {
      this.props.tryToClearFlashMessage();
    }
  }
  render() {
    const { main, flashMessage } = this.props;
    return (
      <div className="wrapper">
        <Header onLogoutClick={this.props.onLogoutClick} />
        <FlashMessage
          {...flashMessage}
          onCloseClick={this.props.onCloseFlashMessage}
        />
        <div className="container main-content">
          {main}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  main: PropTypes.object.isRequired,
  flashMessage: PropTypes.object.isRequired,
  fetchEntries: PropTypes.func.isRequired,
  tryToClearFlashMessage: PropTypes.func.isRequired,
  onCloseFlashMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return state.toJS();
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryToClearFlashMessage: () => dispatch(flashMessageActions.tryToClearFlashMessageOnInterval()),
    fetchEntries: () => dispatch(entryActions.fetchIfNeeded()),
    onCloseFlashMessage: () => dispatch(flashMessageActions.clearFlashMessage()),
    onLogoutClick: () => dispatch(userActions.logOut()),
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
