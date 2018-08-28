import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import hydrateStore from './store/hydrate';
import { auth } from './firebase/firebase';
import logout from './actions/logout';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const appRoot = document.getElementById('app');
const appJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />, appRoot);

let hasRendered = false;
function renderApp() {
  if (!hasRendered) {
    ReactDOM.render(appJsx, appRoot);
    hasRendered = true;
  }
}

auth.onAuthStateChanged(user => {
  if (history.location.pathname === '/users') return;
  if (user) {
    hydrateStore(user.email).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/tickets');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
