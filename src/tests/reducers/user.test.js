import { setUser } from '../../actions/user';
import userReducer from '../../reducers/user';

test('userReducer should set user', () => {
  const key = 'fjfidoajpf';
  const action = setUser(key);
  const state = userReducer(null, action);
  expect(state).toEqual(key);
});
