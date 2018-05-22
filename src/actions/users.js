import db, { auth } from '../firebase/firebase';

export const addUser = user => ({
  type: 'ADD_USER',
  user
});

export const startAddUser = user => {
  return async dispatch => {
    const { key } = db.ref('usersPublic').push(user);
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
    const users = [];
    const snapshot = await db.ref('usersPublic').once('value');
    snapshot.forEach(child => {
      const { key } = child;
      users.push({ key, ...child.val() });
    });
    dispatch(setUsers(users));
  };
};
