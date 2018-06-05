import db from '../firebase/firebase';

export const updateUrgency = ({ key, urgency }) => ({
  type: 'UPDATE_URGENCY',
  key,
  urgency
});

export const startUpdateUrgency = urgency => {
  return async (dispatch, getState) => {
    const { activeTicketKey: key } = getState();
    await db.ref(`tickets/${key}`).update({ urgency });
    dispatch(updateUrgency({ key, urgency }));
  };
};

export const addUser = ({ key, userKey }) => ({
  type: 'ADD_USER_TO_TICKET',
  key,
  userKey
});

export const startAddUser = userKey => {
  return async (dispatch, getState) => {
    const { activeTicketKey: key } = getState();
    await Promise.all([
      db.ref(`tickets/${key}/userKeys`).update({ [userKey]: true }),
      db.ref(`user_tickets/${userKey}`).update({ [ticketKey]: true })
    ]);
    dispatch(addUser({ key, userKey }));
  };
};

export const setTicket = key => ({
  type: 'SET_TICKET',
  key
});

export const unsetTicket = () => ({
  type: 'UNSET_TICKET'
});
