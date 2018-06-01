import db from '../firebase/firebase';

export const addTicket = ticket => ({
  type: 'ADD_TICKET',
  ticket
});

export const startAddTicket = ticketData => {
  const { userKey, comment, ...ticket } = ticketData;
  return async dispatch => {
    const { key } = await db
      .ref('tickets/open')
      .push({ ...ticket, userKeys: { [userKey]: true } });
    await db.ref(`comments/${key}`).push(comment);
    dispatch(
      addTicket({ ...ticket, key, comments: [comment], userKeys: [userKey] })
    );
    return key;
  };
};
