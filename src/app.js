import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { startSetAccounts } from './actions/accounts';
import { startSetUsers } from './actions/users';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const appRoot = document.getElementById('app');
const appJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

Promise.all([
  store.dispatch(startSetAccounts()),
  store.dispatch(startSetUsers())
]).then(() => {
  ReactDOM.render(appJsx, appRoot);
});
