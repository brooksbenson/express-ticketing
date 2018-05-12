export const addTicket = ticket => {
  console.log(ticket);
  return {
    type: 'ADD_TICKET',
    ticket
  };
};
