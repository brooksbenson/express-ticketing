export default (ticketsObj, accountsObj) =>
  Object.keys(ticketsObj).map(ticketKey => {
    const { accountKey, title, urgency, date } = ticketsObj[ticketKey];
    const accountName = accountsObj[accountKey].name;
    return { ticketKey, accountName, title, urgency, date };
  });
