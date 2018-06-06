import usersReducer from '../../reducers/users';
import { addUser, setUsers } from '../../actions/users';
import { usersArr, usersObj } from '../fixtures/users';

test('usersReducer should add user', () => {
  const { key, ...user } = usersArr[0];
  const action = addUser({ key, ...user });
  const state = usersReducer({}, action);
  expect(state[key]).toEqual(user);
});

test('usersReducer should set users', () => {
  const action = setUsers(usersObj);
  const state = usersReducer({}, action);
  expect(state).toEqual(usersObj);
});
