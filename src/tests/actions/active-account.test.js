import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  setActiveAccount,
  startSetActiveAccount,
  unsetActiveAccount,
  startUnsetActiveAccount
} from '../../actions/active-account';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { contactsObj } from '../fixtures/contacts';
import { accountKeys } from '../fixtures/accounts';

const store = configureMockStore([thunk])(storeModel);

beforeEach(done => {
  store.clearActions();
  db.ref()
    .set(dbModel)
    .then(() => done());
});

test('setActiveAccount should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setActiveAccount(key);
  expect(action).toEqual({
    type: 'SET_ACTIVE_ACCOUNT',
    key
  });
});

test('unsetActiveAccount should setup action correctly', () => {
  const action = unsetActiveAccount();
  expect(action).toEqual({
    type: 'UNSET_ACTIVE_ACCOUNT'
  });
});

test('startSetActiveAccount should fetch and set associated contacts from the db', async done => {
  const [key] = accountKeys;
  await store.dispatch(startSetActiveAccount(key));
  const [setActiveAccountAction, setContactsAction] = store.getActions();
  expect(setActiveAccountAction).toEqual({
    type: 'SET_ACTIVE_ACCOUNT',
    key
  });
  expect(setContactsAction).toEqual({
    type: 'SET_CONTACTS',
    contacts: contactsObj[key]
  });
  done();
});

test('startUnsetActiveAccount should unset active contact, contacts, and account', () => {
  store.dispatch(startUnsetActiveAccount());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'UNSET_ACTIVE_CONTACT'
  });
  expect(actions[1]).toEqual({
    type: 'UNSET_CONTACTS'
  });
  expect(actions[2]).toEqual({
    type: 'UNSET_ACTIVE_ACCOUNT'
  });
});
