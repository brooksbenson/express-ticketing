import db from '../firebase/firebase';

export const addTicket = ({ key, ...ticket }) => ({
  type: 'ADD_TICKET',
  key,
  ticket
});

export const startAddTicket = ({ userKey, comment, ...rest }) => {
  return async dispatch => {
    const ticket = { ...rest, usersKeys: { [userKey]: true } };
    const { key } = await db.ref('tickets').push(ticket);
    await Promise.all([
      db.ref('comments/${key}').push(comment),
      db.ref('open_tickets').update({ [key]: true }),
      db.ref('user_tickets/${userKey}').update({ [key]: true })
    ]);
    dispatch(addTicket({ key, ...ticket }));
    return key;
  };
};

export const setTickets = tickets => ({
  type: 'SET_TICKETS',
  tickets
});

export const startSetTickets = userKey => {
  return async dispatch => {
    const [openTicketsSnap, userTicketsSnap] = await Promise.all([
      db.ref('open_tickets').value('once'),
      db.ref(`user_tickets/${userKey}`).value('once')
    ]);
    const toFetch = [];
    const openTicketKeys = Object.keys(openTicketsSnap.val());
    Object.keys(userTicketsSnap.val()).forEach(key => {
      if (openTicketKeys[key]) toFetch.push(key);
    });
    const tickets = {};
    await Promise.all(
      toFetch.map(key => async () => {
        const snap = await db.ref(`tickets/${key}`).once('value');
        tickets[key] = snap.val();
      })
    );
    dispatch(setTickets(tickets));
  };
};
