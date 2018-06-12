import { dispatch, getState } from './store';
import { startSetAccounts } from '../actions/accounts';
import { startSetUsers } from '../actions/users';
import { setUser } from '../actions/active-user';

export default async email => {
  await Promise.all([dispatch(startSetAccounts()), dispatch(startSetUsers())]);
  dispatch(setUser(getState().users, email));
};
