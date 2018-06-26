import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountsReducer from '../reducers/accounts';
import activeAccountReducer from '../reducers/active-account';
import activeContactReducer from '../reducers/active-contact';
import activeTicketReducer from '../reducers/active-ticket';
import activeUserReducer from '../reducers/active-user';
import contactsReducer from '../reducers/contacts';
import ticketsReducer from '../reducers/tickets';
import usersReducer from '../reducers/users';
import newTicketReducer from '../reducers/new-ticket';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  accounts: accountsReducer,
  activeAccountKey: activeAccountReducer,
  activeContactKey: activeContactReducer,
  activeTicketKey: activeTicketReducer,
  activeUserKey: activeUserReducer,
  contacts: contactsReducer,
  tickets: ticketsReducer,
  users: usersReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return {};
  } else {
    return appReducer(state, action);
  }
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
