import { setTicket, unsetTicket } from '../../actions/active-ticket';

test('setTicket should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setTicket(key);
  expect(action).toEqual({
    type: 'SET_TICKET',
    key
  });
});

test('unsetTicket should setup action correctly', () => {
  const action = unsetTicket();
  expect(action).toEqual({
    type: 'UNSET_TICKET'
  });
});
