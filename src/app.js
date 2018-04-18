import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
const appRoot = document.getElementById('app');
const appJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(appJsx, appRoot);