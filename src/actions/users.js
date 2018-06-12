import db, { auth } from '../firebase/firebase';

export const addUser = ({ key, ...user }) => ({
  type: 'ADD_USER',
  key,
  user
});

export const startAddUser = user => {
  return async dispatch => {
    const { key } = await db.ref('user_data').push(user);
    dispatch(addUser({ key, ...user }));
    return key;
  };
};

export const setUsers = users => ({
  type: 'SET_USERS',
  users
});

export const startSetUsers = () => {
  return async dispatch => {
    const snap = await db.ref('user_data').once('value');
    dispatch(setUsers(snap.val()));
  };
};
