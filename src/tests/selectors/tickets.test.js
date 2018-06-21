import ticketSelector from '../../selectors/tickets';

const tickets = [
  {
    title: 'Shipping delay',
    accountName: 'Walmart',
    urgency: 'high'
  },
  {
    title: 'Server failure',
    accountName: 'Amazon',
    urgency: 'medium'
  },
  {
    title: 'Customer complaint',
    accountName: 'Payday Resources',
    urgency: 'low'
  },
  {
    title: 'Missed deadline',
    accountName: 'Flower Motors',
    urgency: 'high'
  }
];

test('ticketSelector should correctly select by accountName', () => {
  const [ticket] = ticketSelector(tickets, 'Amazon');
  expect(ticket.accountName).toBe('Amazon');
});

test('ticketSelector should correctly select by urgency', () => {
  const result = ticketSelector(tickets, 'high');
  expect(result.length).toBe(2);
});

test('ticketSelector should correctly select by title', () => {
  const [ticket] = ticketSelector(tickets, 'Missed deadline');
  expect(ticket.title).toBe('Missed deadline');
});

test('ticketSelector should correctly select with a partial query', () => {
  const [ticket] = ticketSelector(tickets, 'az');
  expect(ticket.accountName).toBe('Amazon');
});
