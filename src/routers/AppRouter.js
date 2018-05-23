import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import AccountManagementPage from '../components/AccountManagementPage';
import UserManagementPage from '../components/UserManagementPage';

// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={UserManagementPage} exact={true} />
        <Route
          path="/admin/accounts"
          component={AccountManagementPage}
          exact={true}
        />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
