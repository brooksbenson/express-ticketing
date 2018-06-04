import { setUser } from '../../actions/user';
import { usersArr, usersObj } from '../fixtures/users';

test('setUser should correctly setup action', () => {
  const { key } = usersArr[0];
  const action = setUser(usersObj[key]);
  expect(action).toEqual({
    type: 'SET_USER',
    user: usersObj[key]
  });
});
