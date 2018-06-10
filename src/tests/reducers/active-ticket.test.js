import {
  setActiveTicket,
  unsetActiveTicket
} from '../../actions/active-ticket';
import activeTicketReducer from '../../reducers/active-ticket';

test('activeTicketReducer should set active ticket', () => {
  const key = 'fjfidoajpf';
  const action = setActiveTicket(key);
  const state = activeTicketReducer(null, action);
  expect(state).toEqual(key);
});

test('activeTicketReducer should unset active ticket', () => {
  const action = unsetActiveTicket();
  const state = activeTicketReducer('fjdkajf', action);
  expect(state).toBe(null);
});
