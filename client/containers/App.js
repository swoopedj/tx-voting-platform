const React = require('react');
const connect = require('react-redux').connect;
const App = () => {
  return (
      <p>App</p>
    // return Components here
	);
};

const mapStateToProps = (state) => {
  return state.toJS();
  // return R.pick(['someProp'], state);
};

const mapDispatchToProps = (dispatch) => {
  return {};
  // return {
  //   onClick: (value) => {
  //     dispatch(actions.someAction(value));
  //   },
  // };
};

const WrappedApp = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

module.exports = WrappedApp;
