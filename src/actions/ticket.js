import db from '../firebase/firebase';
import prepTicket from '../helpers/prep-ticket';

export const addTicket = ticket => ({
  type: 'ADD_TICKET',
  ticket
});

export const startAddTicket = ticket => {
  const { meta, dense, comment, user } = prepTicket(ticket);
  return async dispatch => {
    const { ticketKey } = await db.ref('tickets/open').push(dense).key;
    await Promise.all([
      db.ref('tickets/open/${ticketKey}/comments').push(comment),
      db.ref('tickets/open/${ticketKey}/users').push(user),
      db.ref(`userTickets/${ticket.user.key}/open/${ticketKey}`).set(meta),
      db
        .ref(`accountTickets/${ticket.account.key}/open/${ticketKey}`)
        .set(meta),
      db.ref(`contactTickets/${ticket.contact.key}/open/${ticketKey}`).set(meta)
    ]);
    dispatch(addTicket({ ...dense, comments: [comment], users: [user] }));
  };
};
