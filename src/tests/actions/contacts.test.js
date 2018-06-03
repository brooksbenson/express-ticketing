import db from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addContact,
  startAddContact,
  setContacts,
  startSetContacts,
  updateContact,
  startUpdateContact
} from '../../actions/contacts';
import { contactArr, contactsObj } from '../fixtures/contacts';

const store = configureMockStore([thunk])([]);
beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(null)
    .then(() => done());
});

test('addContact should setup action correctly', () => {
  const { key, ...contact } = contactsArr[0];
  const action = addContact(contact);
  expect(action).toEqual({
    type: 'ADD_CONTACT',
    key,
    contact
  });
});

test('startAddContact should add contact to db & store', done => {
  const accountKey = '-K34jfdkk';
  const { key, ...contact } = contactsArr[0];
  store.dispatch(startAddContact({ contact, accountKey })).then(key => {
    db
      .ref(`contact_data/${accountKey}/${key}`)
      .once('value')
      .then(snap => {
        expect(snap.val()).toEqual(contact);
        const [action] = store.getActions();
        expect(action).toEqual({
          type: 'ADD_CONTACT',
          key,
          contact
        });
        done();
      });
  });
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

// test startUpdateContact
test('startUpdateContact should update contact in db and dispatch action', done => {
  const { key, ...contact } = contacts[0];
  const accountKey = '-98ji98jsil';
  store.dispatch(startAddContact({ accountKey, contact })).then(key => {
    const update = { ...contact, name: 'Jerry' };
    store
      .dispatch(startUpdateContact({ accountKey, key, ...update }))
      .then(() => {
        db
          .ref(`contact_data/${accountKey}/${key}`)
          .once('value')
          .then(snap => {
            expect(snap.val()).toEqual(update);
            const [, action] = store.getActions();
            expect(action).toEqual({
              type: 'UPDATE_CONTACT',
              key,
              update
            });
            done();
          });
      });
  });
});

test('setContacts should correctly setup action', () => {
  const action = setContacts(contactsObj);
  expect(action).toEqual({
    type: 'SET_CONTACTS',
    contacts: contactsObj
  });
});

test('startSetContacts should get contacts from db and dispatch action', done => {
  const accountKey = '-jeiJi38Jksl9';
  db
    .ref(`contact_data/${accountKey}`)
    .set(contactsObj)
    .then(() => {
      store.dispatch(startSetContacts(accountKey)).then(() => {
        const [action] = store.getActions();
        expect(action.contacts).toEqual(contactsObj);
        done();
      });
    });
});
