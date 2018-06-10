import db from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addContact,
  startAddContact,
  setContacts,
  startSetContacts,
  updateContact,
  startUpdateContact,
  unsetContacts,
  startUnsetContacts
} from '../../actions/contacts';
import { contactsArr, contactsObj } from '../fixtures/contacts';
import storeModel from '../fixtures/store-model';
import dbModel from '../fixtures/db-model';

const { activeAccountKey, activeContactKey } = storeModel;

const store = configureMockStore([thunk])(storeModel);
beforeEach(done => {
  store.clearActions();
  db.ref()
    .set(dbModel)
    .then(() => done());
});

test('addContact should setup action correctly', () => {
  const { key, ...contact } = contactsArr[0];
  const action = addContact({ key, ...contact });
  expect(action).toEqual({
    type: 'ADD_CONTACT',
    key,
    contact
  });
});

test('startAddContact should add contact to db & store', async done => {
  const contact = {
    name: 'Brooks B',
    email: 'brooks@mail.com',
    number: '8016516576'
  };
  const key = await store.dispatch(startAddContact(contact));
  const snap = await db
    .ref(`contact_data/${activeAccountKey}/${key}`)
    .once('value');
  expect(snap.val()).toEqual(contact);
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_CONTACT',
    key,
    contact
  });
  done();
});

test('updateContact should correctly setup action', () => {
  const { key, ...update } = contactsArr[0];
  const action = updateContact({ key, ...update });
  expect(action).toEqual({
    type: 'UPDATE_CONTACT',
    key,
    update
  });
});

test('startUpdateContact should update contact in db and dispatch action', async done => {
  const update = { name: 'Jeremiah', email: 'j@mail.com', number: '123' };
  await store.dispatch(startUpdateContact(update));
  const snap = await db
    .ref(`contact_data/${activeAccountKey}/${activeContactKey}`)
    .once('value');
  const [action] = store.getActions();
  expect(snap.val()).toEqual(update);
  expect(action).toEqual({
    type: 'UPDATE_CONTACT',
    key: activeContactKey,
    update
  });
  done();
});

test('setContacts should correctly setup action', () => {
  const contacts = contactsObj[activeAccountKey];
  const action = setContacts(contacts);
  expect(action).toEqual({
    type: 'SET_CONTACTS',
    contacts
  });
});

test('startSetContacts should fetch contacts from db and dispatch action', async done => {
  await store.dispatch(startSetContacts());
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'SET_CONTACTS',
    contacts: contactsObj[activeAccountKey]
  });
  done();
});

test('unsetContacts should correctly setup action', () => {
  const action = unsetContacts();
  expect(action).toEqual({
    type: 'UNSET_CONTACTS'
  });
});

test('startUnsetContacts should unset contacts and unset active contact', () => {
  store.dispatch(startUnsetContacts());
  const [unsetActiveContact, unsetContacts] = store.getActions();
  expect(unsetActiveContact).toEqual({
    type: 'UNSET_ACTIVE_CONTACT'
  });
  expect(unsetContacts).toEqual({
    type: 'UNSET_CONTACTS'
  });
});
