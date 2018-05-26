import users from '../fixtures/users';
import accounts from '../fixtures/accounts';
import contacts from '../fixtures/contacts';

const { isAdmin, ...user } = users[0];

export const ticketInit = date => ({
  date,
  user,
  account: accounts[0],
  contact: contacts[0],
  title: 'Shipping Delay',
  urgency: 'High',
  comment: {
    date,
    name: user.name,
    body: 'Truck #35828 stranded in Nebraska with a flat tire'
  }
});
