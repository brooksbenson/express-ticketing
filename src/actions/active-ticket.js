import db from '../firebase/firebase';
import { setTickets } from './tickets';

export const setActiveTicket = key => ({
  type: 'SET_ACTIVE_TICKET',
  key
});

export const startSetActiveTicket = key => {
  return async (dispatch, getState) => {
    const snap = await db.ref(`tickets/${key}`).once('value');
    const ticket = snap.val();
    const [accountSnap, commentsSnap, contactSnap] = await Promise.all([
      db.ref(`account_data/${ticket.accountKey}`).once('value'),
      db.ref(`comments/${key}`).once('value'),
      db
        .ref(`contact_data/${ticket.accountKey}/${ticket.contactKey}`)
        .once('value')
    ]);
    dispatch(setActiveTicket(key));
    const comments = commentsSnap.val();
    return {
      title: ticket.title,
      urgency: ticket.urgency,
      status: ticket.status,
      userKeys: ticket.userKeys,
      contact: contactSnap.val(),
      accountName: accountSnap.val().name,
      comments: Object.keys(comments).map(key => ({ key, ...comments[key] }))
    };
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
