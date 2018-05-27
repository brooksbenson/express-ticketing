import prepTicket from '../../helpers/prep-ticket';
import { ticketInit } from '../fixtures/tickets';

test('prepTicket should prepare ticket to be saved to db', () => {
  const ticket = ticketInit(Date.now());
  const { meta, dense, comment, user } = prepTicket(ticket);
  expect(meta).toEqual({
    date: ticket.date,
    accountName: ticket.account.name,
    contactName: ticket.contact.name,
    urgency: ticket.urgency,
    title: ticket.title
  });
  expect(dense).toEqual({
    date: ticket.date,
    account: ticket.account,
    contact: ticket.contact,
    urgency: ticket.urgency,
    title: ticket.title
  });
  expect(comment).toEqual(ticket.comment);
  expect(user).toEqual(ticket.user);
});
