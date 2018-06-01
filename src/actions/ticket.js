/*
  update urgency
  add user
  add comment
*/
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

export const startAddComment = ({ ticketKey, comment }) => {
  return async dispatch => {
    const { key } = await db.ref(`comments/${ticketKey}`).push(comment);
    dispatch(addComment(comment));
    return key;
  };
};
