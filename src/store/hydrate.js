import { dispatch, getState } from './store';
import { startSetAccounts } from '../actions/accounts';
import { startSetUsers } from '../actions/users';
import { startSetTickets } from '../actions/tickets';
import { setUser } from '../actions/active-user';

export default async email => {
  await Promise.all([dispatch(startSetAccounts()), dispatch(startSetUsers())]);
  const { users } = getState();
  const usersArr = Object.keys(users).map(key => ({ ...users[key], key }));
  const { key: userKey } = usersArr.find(u => u.email === email);
  dispatch(setUser(userKey));
};
