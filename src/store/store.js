import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import activeAccountReducer from '../reducers/active-account';
import activeContactReducer from '../reducers/active-contact';
import activeTicketReducer from '../reducers/active-ticket';
import activeUserReducer from '../reducers/active-user';
import commentsReducer from '../reducers/comments';
import contactsReducer from '../reducers/contacts';
import ticketsReducer from '../reducers/tickets';
import usersReducer from '../reducers/users';
import newTicketReducer from '../reducers/new-ticket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    accounts: accountsReducer,
    activeAccount: activeAccountReducer,
    activeContact: activeContactReducer,
    activeTicket: activeTicketReducer,
    activeUser: activeUserReducer,
    comments: commentsReducer,
    contacts: contactsReducer,
    tickets: ticketsReducer,
    users: usersReducer,
    newTicket: newTicketReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
