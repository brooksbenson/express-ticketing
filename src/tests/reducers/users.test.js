import usersReducer from '../../reducers/users';
import { addUser, setUsers } from '../../actions/users';
import users from '../fixtures/users';

test('usersReducer should add user', () => {
  const [user] = users;
  const state = usersReducer([], addUser(user));
  expect(state[0]).toEqual(user);
});

test('usersReducer should set users', () => {
  const state = usersReducer([], setUsers(users));
  expect(state).toEqual(users);
});
