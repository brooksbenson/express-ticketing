export default (users, search) => {
  const regex = new RegExp(search.split('').join('.*?'), 'i');
  return users.filter(
    u => regex.test(u.email) || regex.test(u.name) || regex.test(u.number)
  );
};
