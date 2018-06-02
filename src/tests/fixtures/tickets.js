import users from '../fixtures/users';
import accounts from '../fixtures/accounts';
import contacts from '../fixtures/contacts';

const { isAdmin, email, ...user } = users[0];

export const ticketInit = date => ({
  accountKey: accounts[0].key,
  contactKey: contacts[0].key,
  userKey: user.key,
  title: 'Shipping Delay',
  urgency: 'High',
  date,
  comment: {
    date,
    name: user.name,
    body: 'Truck #35828 stranded in Nebraska with a flat tire'
  }
});
