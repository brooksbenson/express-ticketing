import { setUser } from '../../actions/user';
import userReducer from '../../reducers/user';
import { usersArr, usersObj } from '../fixtures/users';

test('userReducer should set user', () => {
  const { key } = usersArr[0];
  const action = setUser(usersObj[key]);
  const state = userReducer(null, action);
  expect(state).toEqual(action.user);
});
