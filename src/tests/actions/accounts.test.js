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
import { accountsArr, accountsObj } from '../fixtures/accounts';

const store = configureMockStore([thunk])({});
beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(null)
    .then(() => done());
});

test('addAccount should correctly setup action', () => {
  const { key, ...account } = accountsArr[0];
  const action = addAccount(account);
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    key,
    account
  });
});

test('startAddAccount should save account to db and store', done => {
  const { key, ...account } = accountsArr[0];
  store.dispatch(startAddAccount(account)).then(accountKey => {
    db
      .ref(`account_data/${accountKey}`)
      .once('value')
      .then(snapshot => {
        const accountSnapshot = snapshot.val();
        expect(accountSnapshot).toEqual(account);
        const [action] = store.getActions();
        expect(action).toEqual({
          type: 'ADD_ACCOUNT',
          key: accountKey,
          account
        });
        done();
      });
  });
});

test('setAccounts should correctly setup action', () => {
  const action = setAccounts(accountsOb);
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accountsObj
  });
});

test('startSetAccounts should fetch accounts from db and dispatch them to store', done => {
  db
    .ref('account_data')
    .set(accountsObj)
    .then(() => {
      store.dispatch(startSetAccounts()).then(() => {
        const [action] = store.getActions();
        expect(action.type).toBe('SET_ACCOUNTS');
        expect(action.accounts).toEqual(accountsObj);
        done();
      });
    });
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

test('startUpdateAccount should update account in db and dispatch action', done => {
  const { key, ...account } = accountsArr[0];
  store.dispatch(startAddAccount(account)).then(key => {
    const update = { ...account, name: 'Animal Arc' };
    store.dispatch(startUpdateAccount({ key, ...update })).then(() => {
      db
        .ref(`account_data/${key}`)
        .once('value')
        .then(snap => {
          expect(snap.val()).toEqual(update);
        });
    });
    const [, action] = store.getActions();
    expect(action).toEqual({
      type: 'UPDATE_ACCOUNT',
      key,
      update
    });
    done();
  });
});
