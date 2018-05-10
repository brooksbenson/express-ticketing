export default (accounts, query) => {
  if (query === '') return [];
  const regex = new RegExp(query.split``.join('.*?'), 'i');
  return accounts.filter(a => regex.test(a.name) || regex.test(a.id));
};
