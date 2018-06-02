import db from '../firebase/firebase';

export const updateUrgency = urgency => ({
  type: 'UPDATE_URGENCY',
  urgency
});

export const startUpdateUrgency = ({ ticketKey, urgency }) => {
  return async dispatch => {
    await db.ref(`tickets/open/${ticketKey}`).update({ urgency });
    dispatch(updateUrgency(urgency));
  };
};

export const addUser = user => ({
  type: 'ADD_USER_TO_TICKET',
  user
});

export const startAddUser = ({ ticketKey, user }) => {
  return async dispatch => {
    await db
      .ref(`tickets/open/${ticketKey}/userKeys`)
      .update({ [user.key]: true });
    dispatch(addUser(user));
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
