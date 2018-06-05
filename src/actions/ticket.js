import db from '../firebase/firebase';

export const updateUrgency = ({ key, urgency }) => ({
  type: 'UPDATE_URGENCY',
  key,
  urgency
});

export const startUpdateUrgency = ({ key, urgency }) => {
  return async dispatch => {
    await db.ref(`tickets/${key}`).update({ urgency });
    dispatch(updateUrgency({ key, urgency }));
  };
};

export const addUser = ({ ticketKey, userKey }) => ({
  type: 'ADD_USER_TO_TICKET',
  ticketKey,
  userKey
});

export const startAddUser = ({ ticketKey, userKey }) => {
  return async dispatch => {
    await Promise.all([
      db.ref(`tickets/${ticketKey}/userKeys`).update({ [userKey]: true }),
      db.ref(`user_tickets/${userKey}`).update({ [ticketKey]: true })
    ]);
    dispatch(addUser({ ticketKey, userKey }));
  };
};

export const addComment = comment => ({
  type: 'ADD_COMMENT_TO_TICKET',
  comment
});

export const startAddComment = ({ ticketKey, comment, index }) => {
  return async dispatch => {
    const key = 'c' + index;
    await db.ref(`tickets/${ticketKey}/comments`).update({ [key]: comment });
    dispatch(addComment(comment));
    return key;
  };
};

// set ticket
export const setTicket = ticket => ({
  type: 'SET_TICKET',
  ticket
});

// start set ticket
export const startSetTicket = t => {
  return async (dispatch, getState) => {
    const [contactSnap, commentSnap] = await Promise.all([
      db.ref(`contacts/${t.contactKey}`).once('value'),
      db.ref(`comments/${t.key}`).once('value')
    ]);
    const { accounts, users } = getState();
    dispatch(
      setTicket({
        date: t.date,
        account: accounts.find(a => a.key == t.accountKey),
        contact: contactSnap.val(),
        comments: commentSnap.val(),
        users: users.filter(u => t.userKeys[u.key]),
        title: t.title,
        urgency: t.urgency
      })
    );
  };
};
