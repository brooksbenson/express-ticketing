import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { setAccounts } from './actions/accounts';
import accounts from './fixtures/accounts';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

store.dispatch(setAccounts(accounts));

const appRoot = document.getElementById('app');
const appJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appJsx, appRoot);
