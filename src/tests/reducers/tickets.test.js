import ticketsReducer from '../../reducers/tickets';
import { addTicket, setTickets } from '../../actions/tickets';
import { ticketsArr, ticketsObj, ticketKeys } from '../fixtures/tickets';

test('should respond to ADD_TICKET correctly', () => {
  const [key] = ticketKeys;
  const ticket = ticketsObj[key];
  const action = addTicket({ key, ...ticket });
  const state = ticketsReducer({}, action);
  expect(state[key]).toEqual(ticket);
});

test('should respond to setTickets correctly', () => {
  const action = setTickets(ticketsObj);
  const state = ticketsReducer({}, action);
  expect(state).toEqual(ticketsObj);
});
