import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import authReducer from '../reducers/auth';
import newTicketReducer from '../reducers/newTicket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    accounts: accountsReducer,
    auth: authReducer,
    newTicket: newTicketReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
