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
