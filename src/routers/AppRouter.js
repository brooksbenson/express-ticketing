import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import AdminRoute from './AdminRoute';
import BaseRoute from './BaseRoute';
import PublicRoute from './PublicRoute';
import AccountManagementPage from '../components/AccountManagementPage';
import UserManagementPage from '../components/UserManagementPage';
import AddTicketPage from '../components/AddTicketPage';
import TicketPage from '../components/TicketPage';
import TicketOverviewPage from '../components/TicketOverviewPage';
import LoginPage from '../components/LoginPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicRoute path="/" Component={LoginPage} exact={true} />
        <BaseRoute path="/create" Component={AddTicketPage} />
        <BaseRoute path="/tickets" Component={TicketOverviewPage} />
        <BaseRoute path="/ticket/:key" Component={TicketPage} />
        <AdminRoute
          path="/accounts"
          Component={AccountManagementPage}
          exact={true}
        />
        <AdminRoute path="/users" Component={UserManagementPage} exact={true} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
