import { dispatch, getState } from './store';
import { startSetAccounts } from '../actions/accounts';
import { startSetUsers } from '../actions/users';
import { setUser } from '../actions/active-user';

export default async email => {
  await Promise.all([dispatch(startSetAccounts()), dispatch(startSetUsers())]);
  const { users } = getState();
  const usersArr = Object.keys(users).map(key => ({ ...users[key], key }));
  const { key } = usersArr.find(u => u.email === email);
  dispatch(setUser(key));
};
