export default (accounts, query) => {
  const regex = new RegExp(query.split``.join('.*?'), 'i');
  return accounts.filter(a => regex.test(a.name) || regex.test(a.id));
}