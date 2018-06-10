import {
  setActiveAccount,
  unsetActiveAccount
} from '../../actions/active-account';
import activeAccountReducer from '../../reducers/active-account';

test('activeAccountReducer should set account', () => {
  const key = 'fjfidoajpf';
  const action = setActiveAccount(key);
  const state = activeAccountReducer(null, action);
  expect(state).toEqual(key);
});

test('activeAccountReducer should unset account', () => {
  const action = unsetActiveAccount();
  const state = activeAccountReducer('fjdkajf', action);
  expect(state).toBe(null);
});
