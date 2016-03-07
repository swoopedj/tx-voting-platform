const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const App = require('./containers/App');
const configureStore = require('./store/configureStore');
const { syncHistoryWithStore } = require('react-router-redux');
const { Router, Route, browserHistory } = require('react-router');
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
