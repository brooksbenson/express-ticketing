import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import hydrateStore from './store/hydrate';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const appRoot = document.getElementById('app');
const appJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

hydrateStore('aidan@mail.com').then(() => {
  ReactDOM.render(appJsx, appRoot);
});
