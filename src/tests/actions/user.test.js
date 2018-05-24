import { setUser } from '../../actions/user';
import users from '../fixtures/users';

test('setUser should correctly setup action', () => {
  const action = setUser(users, 'brooks@mail.com');
  expect(action).toEqual({
    type: 'SET_USER',
    user: users[1]
  });
});
