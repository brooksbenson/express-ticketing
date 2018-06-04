import ticketsReducer from '../../reducers/tickets';
import { addTicket, setTickets } from '../../actions/tickets';
import { ticketsArr, tickets } from '../fixtures/tickets';

test('should respond to ADD_TICKET correctly', () => {
  const { key } = ticketsArr[0];
  const action = addTicket({ key, ...tickets[key] });
  const state = ticketsReducer({}, action);
  expect(state).toEqual({
    [key]: tickets[key]
  });
});

test('should respond to setTickets correctly', () => {
  const action = setTickets(tickets);
  const state = ticketsReducer({}, action);
  expect(state).toEqual(tickets);
});
