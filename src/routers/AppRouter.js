import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import AdminRoute from './AdminRoute';
import AccountManagementPage from '../components/AccountManagementPage';
import UserManagementPage from '../components/UserManagementPage';
import AddTicketPage from '../components/AddTicketPage';
import TicketPage from '../components/TicketPage';

// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        {/*     
        <Route path="/ticket/:key" component={TicketPage} />
        <AdminRoute
          path="/accounts"
          Component={AccountManagementPage}
          exact={true}
        />
*/}
        <Route path="/add" component={AddTicketPage} />
        <Route path="/ticket/:key" component={TicketPage} />
        <Route
          path="/accounts"
          component={AccountManagementPage}
          exact={true}
        />
        <Route path="/users" component={UserManagementPage} exact={true} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
