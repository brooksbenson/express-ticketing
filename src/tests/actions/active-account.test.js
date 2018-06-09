import { setAccount, unsetAccount } from '../../actions/active-account';

test('setAccount should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setAccount(key);
  expect(action).toEqual({
    type: 'SET_ACCOUNT',
    key
  });
});

test('unsetAccount should setup action correctly', () => {
  const action = unsetAccount();
  expect(action).toEqual({
    type: 'UNSET_ACCOUNT'
  });
});
