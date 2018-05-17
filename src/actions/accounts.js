import db from '../firebase/firebase';

export const addAccount = account => ({
  type: 'ADD_ACCOUNT',
  account
});

export const startAddAccount = account => {
  return async dispatch => {
    const { key } = await db.ref('accounts').push();
    await db.ref(`accounts/${key}`).set(account);
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
    const accounts = [];
    await db
      .ref('accounts')
      .once('value')
      .then(snapshot => {
        snapshot.forEach(child => {
          const { key } = child;
          accounts.push({ key, ...child.val() });
        });
        dispatch(setAccounts(accounts));
      });
    return accounts;
  };
};

/*
{
  "accounts": {
    "ref": {
      "name": String,
      "website": String
    }
  },
  "contacts": {
    "ref[account]": {
      "ref": {
        "name": String,
        "email": String,
        "number": String
      }
    }
  }
}
*/
