import { accountsObj } from './accounts';
import { contactsObj } from './contacts';
import { usersObj, usersArr } from './users';
import { ticketArr, tickets, user_tickets, comments } from './tickets';

const userKey = usersArr[0].key;
const keys = Object.keys(user_tickets[userKey]);
const userTickets = {};
keys.forEach(key => {
  userTickets[key] = tickets[key];
});

export default {
  accounts: accountsObj,
  contacts: contactsObj,
  users: usersObj,
  activeUserKey: userKey,
  tickets: userTickets,
  activeTicketKey: keys[0],
  comments: comments[keys[0]]
};
