import db from '../firebase/firebase';

export const addComment = ({ key, ...comment }) => ({
  type: 'ADD_COMMENT_TO_TICKET',
  key,
  comment
});

export const startAddComment = text => {
  return async (dispatch, getState) => {
    const { activeUserKey: userKey, activeTicketKey } = getState();
    const comment = { date: Date.now(), userKey, text };
    const { key } = db.ref(`comments/${activeTicketKey}`).push(payload);
    dispatch(addComment({ key, ...comment }));
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
