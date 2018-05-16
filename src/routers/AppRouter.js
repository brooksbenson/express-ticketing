import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import CreateTicketPage from '../components/CreateTicketPage';
import ManageAccountsPage from '../components/ManageAccountsPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/create" component={CreateTicketPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
