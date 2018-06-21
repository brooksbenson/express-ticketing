import createTicketList from '../../helpers/create-ticket-list';

const tickets = {
  qwer: {
    accountKey: 'yuio',
    title: 'Shipping delay',
    urgency: 'high',
    date: 184929
  },
  cvbn: {
    accountKey: 'yuio',
    title: 'Server crash',
    urgency: 'high',
    date: 184926
  },
  hgjf: {
    accountKey: 'poiu',
    title: 'Customer complaint',
    urgency: 'low',
    date: 184126
  }
};

const accounts = {
  yuio: {
    name: 'Walmart'
  },
  poiu: {
    name: 'Amazon'
  },
  ewer: {
    name: 'Visa'
  }
};

test('create ticket list should correctly generate a ticket list', () => {
  const ticketList = createTicketList(tickets, accounts);
  expect(ticketList.length).toBe(3);
  expect(ticketList[0]).toEqual({
    ticketKey: 'qwer',
    accountName: 'Walmart',
    title: 'Shipping delay',
    urgency: 'high',
    date: 184929
  });
});
