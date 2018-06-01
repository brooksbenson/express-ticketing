import db from '../firebase/firebase';

export const addContact = contact => ({
  type: 'ADD_CONTACT',
  contact
});

export const startAddContact = ({ contact, accountKey }) => {
  return async dispatch => {
    const { key } = await db.ref(`contacts/${accountKey}`).push(contact);
    dispatch(addContact({ key, ...contact }));
    return key;
  };
};

export const updateContact = update => ({
  type: 'UPDATE_CONTACT',
  update
});

export const startUpdateContact = ({ accountKey, contactKey, update }) => {
  return async dispatch => {
    await db.ref(`contacts/${accountKey}/${contactKey}`).set(update);
    dispatch(updateContact({ key: contactKey, ...update }));
  };
};

export const setContacts = contacts => ({
  type: 'SET_CONTACTS',
  contacts
});

export const startSetContacts = accountKey => {
  return async dispatch => {
    const contacts = [];
    await db
      .ref(`contacts/${accountKey}`)
      .once('value')
      .then(snap => {
        snap.forEach(child => {
          const { key } = child;
          contacts.push({ key, ...child.val() });
        });
      });
    dispatch(setContacts(contacts));
  };
};
