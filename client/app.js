const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
require('./lib/longStackTraces.js');
import App from './containers/App';
import HomeRoute from './containers/HomeRoute';
import GetEntryInfoRoute from './containers/GetEntryInfoRoute';
import EntryView from './components/EntryView';
import EntryViewRoute from './containers/EntryViewRoute';
import EntryViewDisplayRoute from './containers/EntryViewDisplayRoute';
import Entry from './models/entry';
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
        <Route path="/entry/new" components={{ main: GetEntryInfoRoute }} />
        <Route path="/entry/yt/create" components={{ main: EntryViewRoute }} />
        <Route path="/entry/yt/:id" components={{ main: EntryViewDisplayRoute }} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
