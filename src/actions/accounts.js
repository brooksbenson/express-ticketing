import db from '../firebase/firebase';

export const addAccount = account => ({
  type: 'ADD_ACCOUNT',
  account
});

export const startAddAccount = data => {
  return async dispatch => {
    const { key } = await db.ref('accounts').push();
    await Promise.all([
      db.ref(`accounts/${key}`).set(data),
      db.ref(`contacts/${key}`).set({})
    ]);
    const account = { ...data, key };
    dispatch(addAccount(account));
    return key;
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
