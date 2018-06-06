import { setUser, unsetUser } from '../../actions/user';
import userReducer from '../../reducers/user';

test('userReducer should set user', () => {
  const key = 'fjfidoajpf';
  const action = setUser(key);
  const state = userReducer(null, action);
  expect(state).toEqual(key);
});

test('userReducer should unset user', () => {
  const action = unsetUser();
  const state = userReducer('fjdkajf', action);
  expect(state).toBe(null);
});
