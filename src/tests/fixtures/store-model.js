import { accountsObj, accountsArr } from './accounts';
import { contactsObj, contactsArr } from './contacts';
import { usersObj, usersArr } from './users';
import { ticketsArr, ticketsObj, userTickets, openTickets } from './tickets';
import { comments } from './comments';

const activeUserKey = usersArr[0].key;
const activeTicketKey = ticketsArr[0].key;
const activeAccountKey = ticketsObj[activeTicketKey].accountKey;
const activeContactKey = ticketsObj[activeTicketKey].contactKey;

const openUserTickets = {};
Object.keys(userTickets[activeUserKey]).forEach(tKey => {
  if (tKey in openTickets) {
    openUserTickets[tKey] = ticketsObj[tKey];
  }
});

export default {
  activeUserKey,
  activeTicketKey,
  activeAccountKey,
  activeContactKey,
  accounts: accountsObj,
  contacts: contactsObj[activeAccountKey],
  comments: comments[activeTicketKey],
  users: usersObj,
  tickets: openUserTickets
};
