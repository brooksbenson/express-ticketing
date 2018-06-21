export default (tickets, query) => {
  const regex = new RegExp(query.split('').join('.*?'), 'i');
  return tickets.filter(
    t =>
      regex.test(t.accountName) || regex.test(t.urgency) || regex.test(t.title)
  );
};
