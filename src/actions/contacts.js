import db from '../firebase/firebase';
import { unsetActiveContact } from './active-contact';

export const addContact = ({ key, ...contact }) => ({
  type: 'ADD_CONTACT',
  key,
  contact
});

export const startAddContact = contact => {
  return async (dispatch, getState) => {
    const { activeAccountKey } = getState();
    const { key } = await db
      .ref(`contact_data/${activeAccountKey}`)
      .push(contact);
    dispatch(addContact({ key, ...contact }));
    return key;
  };
};

export const updateContact = ({ key, ...update }) => ({
  type: 'UPDATE_CONTACT',
  key,
  update
});

export const startUpdateContact = update => {
  return async (dispatch, getState) => {
    const { activeAccountKey, activeContactKey } = getState();
    await db
      .ref(`contact_data/${activeAccountKey}/${activeContactKey}`)
      .set(update);
    dispatch(updateContact({ key: activeContactKey, ...update }));
  };
};

export const setContacts = contacts => ({
  type: 'SET_CONTACTS',
  contacts
});

export const startSetContacts = () => {
  return async (dispatch, getState) => {
    const { activeAccountKey } = getState();
    const snap = await db.ref(`contact_data/${activeAccountKey}`).once('value');
    dispatch(setContacts(snap.val()));
  };
};

export const unsetContacts = () => ({
  type: 'UNSET_CONTACTS'
});

export const startUnsetContacts = () => {
  return dispatch => {
    dispatch(unsetActiveContact());
    dispatch(unsetContacts());
  };
};
