import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import usersReducer from '../reducers/users';
import userReducer from '../reducers/user';
import newTicketReducer from '../reducers/new-ticket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    accounts: accountsReducer,
    users: usersReducer,
    user: userReducer,
    newTicket: newTicketReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
