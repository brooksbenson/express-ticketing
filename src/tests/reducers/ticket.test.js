import ticketsReducer from '../../reducers/tickets';
import { addUser, updateUrgency, updateStatus } from '../../actions/ticket';
import { ticketsObj, userTickets } from '../fixtures/tickets';

const [activeUserKey] = Object.keys(userTickets);
const ticketKeys = Object.keys(userTickets[activeUserKey]);
const tickets = {};
ticketKeys.forEach(key => {
  tickets[key] = ticketsObj[key];
});

test('ticketsReducer should adjust ticket urgency correctly', () => {
  const [key] = Object.keys(tickets);
  const urgency = 'High';
  const action = updateUrgency({ key, urgency });
  const state = ticketsReducer(tickets, action);
  expect(state[key].urgency).toBe(urgency);
});

test('ticketsReducer should add user to ticket correctly', () => {
  const [key] = Object.keys(tickets);
  const userKey = '-888888';
  const action = addUser({ key, userKey });
  const state = ticketsReducer(tickets, action);
  expect(state[key].userKeys).toHaveProperty(userKey);
});

test('ticketsReducer should update the ticket status correctly', () => {
  const [key] = Object.keys(tickets);
  const status = 'closed';
  const action = updateStatus({ key, status });
  const state = ticketsReducer(tickets, action);
  expect(state[key].status).toBe(status);
});
