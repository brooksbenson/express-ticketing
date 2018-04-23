export default (contacts, query) => {
  const regex = new RegExp(query.split``.join('.*?'), 'i');
  return contacts.filter(c => (
    regex.test(c.name) || 
    regex.test(c.number) || 
    regex.test(c.email))
  );
}