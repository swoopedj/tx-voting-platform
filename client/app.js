const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
require('./lib/longStackTraces.js');
import App from './containers/App';
import HomeRoute from './containers/HomeRoute';
import CreateLinkRoute from './containers/CreateLinkRoute'
const { Router, Route, IndexRoute } = require('react-router');
const configureStore = require('./store/configureStore');
const configureHistory = require('./lib/configureHistory');
const store = configureStore();
const history = configureHistory(store);

ReactDOM.render(
	<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute components={{ main: HomeRoute }} />
        <Route path="/create/:id" components={{ main: CreateLinkRoute }} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
