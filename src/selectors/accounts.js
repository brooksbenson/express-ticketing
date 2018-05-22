export default (accounts, search) => {
  const regex = new RegExp(search.split('').join('.*?'), 'i');
  return accounts.filter(a => regex.test(a.name));
};
