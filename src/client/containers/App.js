import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions  from '../actionCreators/entries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlashMessage from '../components/FlashMessage';

const message = {
  key: 1,
  text: 'Success! Your entry was submitted.',
  isVisible: false,
  messageType: 'success',
  onClick: function(){
    isVisible: false;
  }
};

class App extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }
  render() {
    const { main } = this.props;
    return (
      <div className="wrapper">
        <Header />
        <FlashMessage
          isVisible={message.isVisible}
          text={message.text}
          messageType={message.messageType}
          onClick={message.onClick}
        />
        <div className="container main-content">
          {main}
        </div>
        <Footer />
      </div>
    );  
  }
}

const mapStateToProps = (state) => {
  return state.toJS();
  // return R.pick(['someProp'], state);
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEntries: () => dispatch(actions.fetchIfNeeded()),
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
