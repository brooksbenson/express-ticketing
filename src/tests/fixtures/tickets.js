import users from './users';
import accounts from './accounts';
import contacts from './contacts';

export const rawTicket = () => {
  const { website, ...account } = accounts[0];
  const [contact] = contacts;
};
