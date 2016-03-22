const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
require('./lib/longStackTraces.js');
import App from './containers/App';
import HomeRoute from './containers/HomeRoute';
import EntriesRoute from './containers/EntriesRoute';
import GetEntryInfoRoute from './containers/GetEntryInfoRoute';
<<<<<<< 3a3fb2c4fca8905d4d966b0fc8b9325ace72b0b1
import LoginRoute from './containers/LoginRoute';
=======
import Login from './components/Login';
import Header from './components/Header';
>>>>>>> Update home page layout and move header.
import Profile from './components/Profile';
import NoMatch from './components/NoMatch';
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
<<<<<<< 3a3fb2c4fca8905d4d966b0fc8b9325ace72b0b1
        <Route path="/entry/new" components={{ main: GetEntryInfoRoute }} />
        <Route path="/entry/yt/:id" components={{ main: EntryViewRoute }} />
        <Route path="/entry/yt/:is_edit/:id" components={{ main: EntryViewRoute }} />
        <Route path="/login" components={{ main: LoginRoute }} />
        <Route path="/profile" components={{ main: requireAuthentication(Profile) }} />
        <Route path="/*" components={{ main: NoMatch }} />
=======
        <Route path="/entries" components={{ main: EntriesRoute, header: Header }} />
        <Route path="/entry/new" components={{ main: GetEntryInfoRoute, header: Header }} />
        <Route path="/entry/yt/:id" components={{ main: EntryViewRoute, header: Header }} />
        <Route path="/entry/yt/:is_edit/:id" components={{ main: EntryViewRoute, header: Header }} />
        <Route path="/login" components={{ main: Login, header: Header }} />
        <Route path="/profile" components={{ main: Profile, header: Header }} />
        <Route path="/*" components={{ main: NoMatch, header: Header }} />
>>>>>>> Update home page layout and move header.
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
