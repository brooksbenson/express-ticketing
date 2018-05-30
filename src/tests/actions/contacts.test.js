import db from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addContact, startAddContact } from '../../actions/contacts';
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
