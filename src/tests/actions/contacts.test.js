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
import contacts from '../fixtures/contacts';

const store = configureMockStore([thunk])([]);
beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(null)
    .then(() => done());
});

test('addContact should setup action correctly', () => {
  const [contact] = contacts;
  const action = addContact(contact);
  expect(action).toEqual({
    type: 'ADD_CONTACT',
    contact
  });
});

test('startAddContact should add contact to db & store', done => {
  const accountKey = '-K34jfdkk';
  const { key, ...contact } = contacts[0];
  store.dispatch(startAddContact({ contact, accountKey })).then(cKey => {
    db
      .ref(`contacts/${accountKey}/${cKey}`)
      .once('value')
      .then(snap => {
        expect(snap.val()).toEqual(contact);
        const [action] = store.getActions();
        expect(action).toEqual({
          type: 'ADD_CONTACT',
          contact: { ...contact, key: cKey }
        });
        done();
      });
  });
});

test('setContacts should correctly setup action', () => {
  const action = setContacts(contacts);
  expect(action).toEqual({
    type: 'SET_CONTACTS',
    contacts
  });
});

test('startSetContacts should get contacts from db and dispatch action', done => {
  const accountKey = '-jeiJi38Jksl9';
  const contactsWithoutKey = contacts.map(({ key, ...c }) => c);
  db
    .ref(`contacts/${accountKey}`)
    .set(contactsWithoutKey)
    .then(() => {
      store.dispatch(startSetContacts(accountKey)).then(() => {
        const [action] = store.getActions();
        expect(action.contacts.length).toBe(contacts.length);
        done();
      });
    });
});

test('updateContact should correctly setup action', () => {
  const [update] = contacts;
  const action = updateContact(update);
  expect(action).toEqual({
    type: 'UPDATE_CONTACT',
    update
  });
});

// test startUpdateContact
test('startUpdateContact should update contact in db and dispatch action', done => {
  const { key, ...contact } = contacts[0];
  const accountKey = '-98ji98jsil';
  store
    .dispatch(startAddContact({ accountKey, ...contact }))
    .then(contactKey => {
      const update = { ...contact, name: 'Jerry' };
      store
        .dispatch(startUpdateContact({ accountKey, contactKey, update }))
        .then(() => {
          db
            .ref(`contacts/${accountKey}/${contactKey}`)
            .once('value')
            .then(snap => {
              expect(snap.val()).toEqual(update);
              const [, action] = store.getActions();
              expect(action).toEqual({
                type: 'UPDATE_CONTACT',
                update: { key: contactKey, ...update }
              });
              done();
            });
        });
    });
});
