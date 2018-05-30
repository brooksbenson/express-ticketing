export default (contacts, search) => {
  const regex = new RegExp(search.split('').join('.*?'), 'i');
  return contacts.filter(
    c => regex.test(c.name) || regex.test(c.email) || regex.test(c.number)
  );
};
