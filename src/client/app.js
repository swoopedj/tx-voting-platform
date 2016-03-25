const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
require('./lib/longStackTraces.js');
import App from './containers/App';
import HomeRoute from './containers/HomeRoute';
import EntriesRoute from './containers/EntriesRoute';
import GetEntryInfoRoute from './containers/GetEntryInfoRoute';
import LoginRoute from './containers/LoginRoute';
import Profile from './components/Profile';
import About from './components/About';
import NoMatch from './components/NoMatch';
import ProfileRoute from './containers/ProfileRoute';
import EntryViewRoute from './containers/EntryViewRoute';
import { requireAuthentication } from './containers/AuthenticatedComponent';
const { Router, Route, IndexRoute } = require('react-router');
const configureStore = require('./store/configureStore');
const configureHistory = require('./lib/configureHistory');
const store = configureStore();
const history = configureHistory(store);

ReactDOM.render(
	<Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute components={{ main: HomeRoute }} />
        <Route path="/entries" components={{ main: EntriesRoute }} />
        <Route path="/entry/new" components={{ main: requireAuthentication(GetEntryInfoRoute) }} />
        <Route path="/entry/yt/:id" components={{ main: EntryViewRoute }} />
        <Route path="/entry/yt/:is_edit/:id" components={{ main: requireAuthentication(EntryViewRoute) }} />
        <Route path="/login" components={{ main: LoginRoute }} />
        <Route path="/profile/:auth_id" components={{ main: ProfileRoute }} />
        <Route path="/about" components={{ main: About }} />
        <Route path="/*" components={{ main: NoMatch }} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
