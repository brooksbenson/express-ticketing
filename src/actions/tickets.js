import db from '../firebase/firebase';

export const addTicket = ({ key, ...ticket }) => ({
  type: 'ADD_TICKET',
  key,
  ticket
});

export const startAddTicket = ({ title, urgency }) => {
  return async (dispatch, getState) => {
    const state = getState();
    const ticket = {
      date: Date.now(),
      title,
      urgency,
      accountKey: state.activeAccountKey,
      contactKey: state.activeContactKey,
      userKeys: { [state.activeUserKey]: true },
      status: 'open'
    };
    const { key } = await db.ref('tickets').push(ticket);
    await Promise.all([
      db.ref('open_tickets').update({ [key]: true }),
      db.ref(`user_tickets/${state.activeUserKey}`).update({ [key]: true })
    ]);
    dispatch(addTicket({ key, ...ticket }));
    return key;
  };
};

export const setTickets = tickets => ({
  type: 'SET_TICKETS',
  tickets
});

export const startSetTickets = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const [openTickets, userTickets] = await Promise.all([
      db.ref('open_tickets').once('value'),
      db.ref(`user_tickets/${state.activeUserKey}`).once('value')
    ]);
    const toFetch = [];
    const userTicketsObj = userTickets.val() || {};
    Object.keys(openTickets.val() || {}).forEach(key => {
      if (key in userTicketsObj) toFetch.push(key);
    });
    const tickets = {};
    await Promise.all(
      toFetch.map(
        key =>
          new Promise(resolve => {
            db.ref(`tickets/${key}`)
              .once('value')
              .then(snap => {
                tickets[key] = snap.val();
                resolve();
              });
          })
      )
    );
    dispatch(setTickets(tickets));
  };
};
