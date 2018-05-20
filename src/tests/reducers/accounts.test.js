import accountsReducer from '../../reducers/accounts';
import { setAccounts, addAccount, updateAccount } from '../../actions/accounts';
import accounts from '../fixtures/accounts';

test('should set accounts correctly', () => {
  const action = setAccounts(accounts);
  const state = accountsReducer([], action);
  expect(state).toEqual(accounts);
});

test('should add account correctly', () => {
  const [account] = accounts;
  const action = addAccount(account);
  const state = accountsReducer([], action);
  expect(state[0]).toEqual(account);
});

test('should update account correctly', () => {
  const [account] = accounts;
  const { key } = account;
  const update = { ...account, name: 'Mcdonalds' };
  const action = updateAccount(update);
  const state = accountsReducer(accounts, action);
  state.forEach(account => {
    if (account.key === key) {
      expect(account).toEqual(update);
    }
  });
});
