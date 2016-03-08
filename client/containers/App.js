const React = require('react');
const connect = require('react-redux').connect;

const Header = require('../components/app/Header');
const MediaCard = require('../components/app/MediaCard');

const App = () => {
  return (
    <div>
      <Header />
      <div className="container content">
        <h2>YouTube</h2>
        <div className="columns">
          <MediaCard />
          <MediaCard />
          <MediaCard />
        </div>
      </div>
    </div>
	);
};

const mapStateToProps = (state) => {
  return state.toJS();
  // return R.pick(['someProp'], state);
};

const mapDispatchToProps = () => {
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
