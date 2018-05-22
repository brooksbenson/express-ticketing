export default (users, search) => {
  const regex = new RegExp(search.split('').join('.*?'), 'i');
  return users.filter(user => regex.test(user.email));
};
