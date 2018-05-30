import db from '../firebase/firebase';

export const addTicket = ticket => ({
  type: 'ADD_TICKET',
  ticket
});

export const startAddTicket = ticketData => {
  const { user, comment, ...ticket } = ticketData;
  return async dispatch => {
    const { key } = await db
      .ref('tickets/open')
      .push({ ...ticket, userKeys: { [user.key]: true } });
    await db.ref(`comments/${key}`).set({ c1: comment });
    dispatch(
      addTicket({ ...ticket, key, comments: [comment], userKeys: [user.key] })
    );
    return key;
  };
};
