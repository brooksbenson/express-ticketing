export default (accounts = [], action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'ADD_CONTACT':
      return accounts.map(
        a =>
          a.id === action.id
            ? { ...a, contacts: [...a.contacts, action.contact] }
            : a
      );
    default:
      return accounts;
  }
};
