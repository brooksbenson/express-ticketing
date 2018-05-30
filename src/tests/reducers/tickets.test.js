import ticketsReducer from '../../reducers/tickets';
import { addTicket } from '../../actions/tickets';
import { ticketInit } from '../fixtures/tickets';

test('should add ticket correctly', () => {
  const ticket = ticketInit(Date.now());
  const action = addTicket(ticket);
  const state = ticketsReducer([], action);
  expect(state[0]).toEqual(ticket);
});
