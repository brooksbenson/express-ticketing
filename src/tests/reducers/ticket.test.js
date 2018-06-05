import activeTicketReducer from '../../reducers/ticket';
import ticketsReducer from '../../reducers/tickets';
import { setTicket, addUser, updateUrgency } from '../../actions/ticket';
import { ticketsArr, tickets } from '../fixtures/tickets';

test('activeTicketKeyReducer should set ticket key correctly', () => {
  const key = '-888888';
  const action = setTicket(key);
  const state = activeTicketReducer(null, action);
  expect(state).toEqual(key);
});

test('activeTicketKeyReducer should unset ticket key correctly', () => {
  const action = unsetTicket();
  const state = activeTicketReducer('-83849', unsetTicket);
  expect(state).toEqual(null);
});

test('ticketsReducer should adjust ticket urgency correctly', () => {
  const { key } = ticketsArr[0];
  const urgency = 'High';
  const action = updateUrgency({ key, urgency });
  const state = ticketsReducer(tickets, action);
  expect(state[key].urgency).toBe(urgency);
});

test('ticketReducer should add user to ticket correctly', () => {
  const { key } = ticketsArr[0];
  const userKey = '-888888';
  const action = addUser({ key, userKey });
  const state = ticketsReducer(tickets, action);
  expect(state[key].userKeys).toHaveProperty(userKey);
});
