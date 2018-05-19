import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    accounts: accountsReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
