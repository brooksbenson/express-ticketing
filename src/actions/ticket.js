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
      db.ref(`user_tickets/${userKey}`).update({ [key]: true })
    ]);
  };
};

export const updateStatus = ({ key, status }) => ({
  type: 'UPDATE_STATUS',
  key,
  status
});

export const startUpdateStatus = status => {
  return async (dispatch, getState) => {
    const { activeTicketKey: key } = getState();
    await db.ref(`tickets/${key}`).update({ status });
    dispatch(updateStatus({ key, status }));
  };
};

export const startCloseTicket = () => {
  return async (dispatch, getState) => {
    const { activeTicketKey: key } = getState();
    await Promise.all([
      db.ref('open_tickets').update({ [key]: null }),
      db.ref('closed_tickets').update({ [key]: true }),
      dispatch(startUpdateStatus('closed'))
    ]);
  };
};

export const startReopenTicket = () => {
  return async (dispatch, getState) => {
    const { activeTicketKey: key } = getState();
    await Promise.all([
      db.ref(`open_tickets`).update({ [key]: true }),
      db.ref(`closed_tickets`).update({ [key]: null }),
      dispatch(startUpdateStatus('open'))
    ]);
  };
};
