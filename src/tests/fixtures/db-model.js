import { accountsObj } from './accounts';
import { usersObj } from './users';
import { contactsObj } from './contacts';
import { ticketsObj, closedTickets, openTickets, userTickets } from './tickets';
import { comments } from './comments';

export default {
  account_data: accountsObj,
  user_data: usersObj,
  contact_data: contactsObj,
  tickets: ticketsObj,
  open_tickets: openTickets,
  closed_tickets: closedTickets,
  user_tickets: userTickets,
  comments
};
