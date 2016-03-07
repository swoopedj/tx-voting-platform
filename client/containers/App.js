const React = require('react');
const R = require('ramda');
const connect = require('react-redux').connect;
const actions = require('../actionCreators/todos');
// FIXME: ESLint
const App = ({someProp, onClick}) => {
  if (isLoading) return (<p>Loading</p>);
  return (
      <p>App</p>
    // return Components here
	);
};

const mapStateToProps = (state) => {
  return state;
  // return R.pick(['someProp'], state);
};

const mapDispatchToProps = (dispatch) => {
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
