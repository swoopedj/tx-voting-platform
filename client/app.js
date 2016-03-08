const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const App = require('./containers/App');
const Test = require('./components/Test');
const { Router, Route } = require('react-router');
const configureStore = require('./store/configureStore');
const configureHistory = require('./lib/configureHistory');
const store = configureStore();
const history = configureHistory(store);

ReactDOM.render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/test" component={Test} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
