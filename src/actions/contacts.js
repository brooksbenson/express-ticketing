import db from '../firebase/firebase';

export const addContact = ({ key, ...contact }) => ({
  type: 'ADD_CONTACT',
  key,
  contact
});

export const startAddContact = ({ contact, accountKey }) => {
  return async dispatch => {
    const { key } = await db.ref(`contact_data/${accountKey}`).push(contact);
    dispatch(addContact({ key, ...contact }));
    return key;
  };
};

export const updateContact = ({ key, ...update }) => ({
  type: 'UPDATE_CONTACT',
  key,
  update
});

export const startUpdateContact = ({ accountKey, key, ...update }) => {
  return async dispatch => {
    await db.ref(`contact_data/${accountKey}/${key}`).set(update);
    dispatch(updateContact({ key, ...update }));
  };
};

export const setContacts = contacts => ({
  type: 'SET_CONTACTS',
  contacts
});

export const startSetContacts = accountKey => {
  return async dispatch => {
    const snap = db.ref(`contact_data/${accountKey}`).only('value');
    dispatch(setContacts(snap.val()));
  };
};
