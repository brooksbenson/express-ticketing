import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  addAccount,
  startAddAccount,
  setAccounts,
  startSetAccounts,
  updateAccount,
  startUpdateAccount
} from '../../actions/accounts';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { accountsArr, accountsObj } from '../fixtures/accounts';

const store = configureMockStore([thunk])(storeModel);
beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(dbModel)
    .then(() => done());
});

test('addAccount should correctly setup action', () => {
  const { key, ...account } = accountsArr[0];
  const action = addAccount({ key, ...account });
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    key,
    account
  });
});

test('startAddAccount should save account to db and store', async done => {
  const account = { name: 'Big Brands', website: 'www.brands.com' };
  const key = await store.dispatch(startAddAccount(account));
  const snap = await db.ref(`account_data/${key}`).once('value');
  expect(snap.val()).toEqual(account);
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    key,
    account
  });
  done();
});

test('setAccounts should correctly setup action', () => {
  const action = setAccounts(accountsObj);
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accounts: accountsObj
  });
});

test('startSetAccounts should fetch accounts from db and dispatch them to store', async done => {
  await store.dispatch(startSetAccounts());
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accounts: accountsObj
  });
  done();
});

test('updateAccount should setup action correctly', () => {
  const { key, ...update } = accountsArr[0];
  const action = updateAccount({ key, ...update });
  expect(action).toEqual({
    type: 'UPDATE_ACCOUNT',
    key,
    update
  });
});

test('startUpdateAccount should update account in db and dispatch action', async done => {
  const { key, ...account } = accountsArr[0];
  const update = { ...account, name: 'Wendys' };
  await store.dispatch(startUpdateAccount({ key, ...update }));
  const snap = await db.ref(`account_data/${key}`).once('value');
  expect(snap.val()).toEqual(update);
  done();
});
