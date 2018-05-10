export default (accounts = [], action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return action.accounts;
    default:
      return accounts;
  }
};
