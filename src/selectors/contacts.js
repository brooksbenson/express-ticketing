export default (contacts, query) => {
  if (query === '') return [];
  const regex = new RegExp(query.split``.join('.*?'), 'i');
  return contacts.filter(
    c => regex.test(c.name) || regex.test(c.number) || regex.test(c.email)
  );
};
