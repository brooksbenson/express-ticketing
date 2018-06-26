import db from '../firebase/firebase';

export const addComment = ({ key, ...comment }) => ({
  type: 'ADD_COMMENT',
  key,
  comment
});

export const startAddComment = (text, ticketKey) => {
  return async (dispatch, getState) => {
    const { activeUserKey, activeTicketKey, users } = getState();
    const comment = { date: Date.now(), userKey: activeUserKey, text };
    const { key } = await db
      .ref(`comments/${activeTicketKey || ticketKey}`)
      .push(comment);
    dispatch(addComment({ key, ...comment }));
    return key;
  };
};

export const setComments = comments => ({
  type: 'SET_COMMENTS',
  comments
});

export const startSetComments = () => {
  return async (dispatch, getState) => {
    const { activeTicketKey } = getState();
    const snap = await db.ref(`comments/${activeTicketKey}`).once('value');
    dispatch(setComments(snap.val()));
  };
};

export const unsetComments = () => ({
  type: 'UNSET_COMMENTS'
});
