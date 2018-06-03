import accountsReducer from '../../reducers/accounts';
import { setAccounts, addAccount, updateAccount } from '../../actions/accounts';
import { accountsArr, accountsObj } from '../fixtures/accounts';

test('should set accounts correctly', () => {
  const action = setAccounts(accountsObj);
  const state = accountsReducer({}, action);
  expect(state).toEqual(accountsObj);
});

test('should add account correctly', () => {
  const { key, ...account } = accountsArr[0];
  const action = addAccount({ key, ...account });
  const state = accountsReducer({}, action);
  expect(state[key]).toEqual(account);
});

test('should update account correctly', () => {
  const { key, ...account } = accountsArr[0];
  const update = { ...account, name: 'Fake News CNN' };
  const action = updateAccount({ key, ...update });
  const state = accountsReducer(accountsObj, action);
  expect(state[key]).toEqual(update);
});
