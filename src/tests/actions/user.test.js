import { setUser, unsetUser } from '../../actions/user';

test('setUser should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setUser(key);
  expect(action).toEqual({
    type: 'SET_USER',
    key
  });
});

test('unsetUser should setup action correctly', () => {
  const action = unsetUser();
  expect(action).toEqual({
    type: 'UNSET_USER'
  });
});
