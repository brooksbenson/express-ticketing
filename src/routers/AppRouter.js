import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import AdminRoute from './AdminRoute';
import AccountManagementPage from '../components/AccountManagementPage';
import UserManagementPage from '../components/UserManagementPage';
import AddTicketPage from '../components/AddTicketPage';

// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={AddTicketPage} exact={true} />
        <AdminRoute path="/users" Component={UserManagementPage} exact={true} />
        <AdminRoute
          path="/accounts"
          Component={AccountManagementPage}
          exact={true}
        />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
