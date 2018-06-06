import db from '../firebase/firebase';

export const addAccount = ({ key, ...account }) => ({
  type: 'ADD_ACCOUNT',
  key,
  account
});

export const startAddAccount = account => {
  return async dispatch => {
    const { key } = await db.ref('account_data').push(account);
    dispatch(addAccount({ key, ...account }));
    return key;
  };
};

export const setAccounts = accounts => ({
  type: 'SET_ACCOUNTS',
  accounts
});

export const startSetAccounts = () => {
  return async dispatch => {
    const snap = await db.ref('account_data').once('value');
    dispatch(setAccounts(snap.val()));
  };
};

export const updateAccount = ({ key, ...update }) => ({
  type: 'UPDATE_ACCOUNT',
  key,
  update
});

export const startUpdateAccount = ({ key, ...update }) => {
  return async dispatch => {
    await db.ref(`account_data/${key}`).set(update);
    dispatch(updateAccount({ key, ...update }));
  };
};
