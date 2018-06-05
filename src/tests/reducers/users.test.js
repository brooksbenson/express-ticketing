import usersReducer from '../../reducers/users';
import { addUser, setUsers } from '../../actions/users';
import { usersArr, usersObj } from '../fixtures/users';

test('usersReducer should add user', () => {
  const { key, ...user } = usersArr[0];
  const state = usersReducer({}, addUser(user));
  expect(state).toEqual({ [key]: user });
});

test('usersReducer should set users', () => {
  const state = usersReducer({}, setUsers(usersObj));
  expect(state).toEqual(usersObj);
});
