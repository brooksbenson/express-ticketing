import { setUser } from '../../actions/user';
import userReducer from '../../reducers/user';
import users from '../fixtures/users';

test('userReducer should set user', () => {
  const action = setUser(users, 'brooks@mail.com');
  const state = userReducer(null, action);
  expect(state).toEqual(action.user);
});
