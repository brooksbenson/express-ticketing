import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import userReducer from '../reducers/user';
import newTicketReducer from '../reducers/newTicket';
import ticketsReducer from '../reducers/tickets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    accounts: accountsReducer,
    newTicket: newTicketReducer,
    tickets: ticketsReducer,
    user: userReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
