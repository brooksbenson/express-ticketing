import db from '../firebase/firebase';

export const addTicket = ({ userKey, ...ticket }) => ({
  type: 'ADD_TICKET',
  ticket: { ...ticket, userKeys: [userKey] }
});

export const startAddTicket = ({ userKey, comment, ...ticket }) => {
  return async dispatch => {
    const { key } = await db.ref('tickets').push({
      ...ticket,
      userKeys: { [userKey]: true }
    });
    await db.ref(`comments/${key}`).push(comment);
    dispatch(addTicket({ key, ...ticket, userKeys: { [userKey]: true } }));
    return key;
  };
};
