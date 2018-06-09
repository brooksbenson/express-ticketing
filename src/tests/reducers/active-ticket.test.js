import { setTicket, unsetTicket } from '../../actions/active-ticket';
import activeTicketReducer from '../../reducers/active-ticket';

test('activeTicketReducer should set ticket', () => {
  const key = 'fjfidoajpf';
  const action = setTicket(key);
  const state = activeTicketReducer(null, action);
  expect(state).toEqual(key);
});

test('TicketReducer should unset ticket', () => {
  const action = unsetTicket();
  const state = activeTicketReducer('fjdkajf', action);
  expect(state).toBe(null);
});
