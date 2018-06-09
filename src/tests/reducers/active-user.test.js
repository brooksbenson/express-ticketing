import { setUser, unsetUser } from '../../actions/active-user';
import activeUserReducer from '../../reducers/active-user';

test('activeUserReducer should set user', () => {
  const key = 'fjfidoajpf';
  const action = setUser(key);
  const state = activeUserReducer(null, action);
  expect(state).toEqual(key);
});

test('userReducer should unset user', () => {
  const action = unsetUser();
  const state = activeUserReducer('fjdkajf', action);
  expect(state).toBe(null);
});
