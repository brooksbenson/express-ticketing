import {
  startSetActiveAccount,
  startUnsetActiveAccount
} from './active-account';
import { setActiveContact } from './active-contact';
import { startSetComments, unsetComments } from './comments';

export const setActiveTicket = key => ({
  type: 'SET_ACTIVE_TICKET',
  key
});

export const startSetActiveTicket = key => {
  return async (dispatch, getState) => {
    const ticket = getState().tickets[key];
    dispatch(setActiveTicket(key));
    await dispatch(startSetComments());
    await dispatch(startSetActiveAccount(ticket.accountKey));
    dispatch(setActiveContact(ticket.accountKey));
  };
};

export const unsetActiveTicket = () => ({
  type: 'UNSET_ACTIVE_TICKET'
});

export const startUnsetActiveTicket = () => {
  return dispatch => {
    // unsets account, contacts, and active contact
    dispatch(startUnsetActiveAccount());
    dispatch(unsetComments());
    dispatch(unsetActiveTicket());
  };
};
