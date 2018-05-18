import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  addAccount,
  startAddAccount,
  setAccounts,
  startSetAccounts
} from '../../actions/accounts';
import accountsData from '../fixtures/accounts';

const accounts = accountsData.map(a => {
  const { key, ...account } = a;
  return account;
});

const store = configureMockStore([thunk])({});
beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(null)
    .then(() => done());
});

test('addAccount should correctly setup action', () => {
  const [account] = accounts;
  const action = addAccount(account);
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    account
  });
});

test('startAddAccount should save account to db', done => {
  const [account] = accounts;
  store.dispatch(startAddAccount(account)).then(key => {
    db
      .ref(`accounts/${key}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(account);
        done();
      });
  });
});

test('startAddAccount should add account with key to store', done => {
  const [account] = accounts;
  store.dispatch(startAddAccount(account)).then(key => {
    const [action] = store.getActions();
    const accountWKey = { ...account, key };
    expect(action).toEqual({
      type: 'ADD_ACCOUNT',
      account: accountWKey
    });
    done();
  });
});

test('setAccounts should correctly setup action', () => {
  const action = setAccounts(accounts);
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accounts
  });
});

test('startSetAccounts should add accounts with keys to store', done => {
  db
    .ref('accounts')
    .set(accounts)
    .then(() => {
      store.dispatch(startSetAccounts()).then(() => {
        const [action] = store.getActions();
        expect(action.type).toBe('SET_ACCOUNTS');
        expect(action.accounts.length).toBe(3);
        action.accounts.forEach(account => {
          expect(account.key).toBeTruthy();
        });
        done();
      });
    });
});
