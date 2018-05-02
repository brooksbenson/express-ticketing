export const setAccounts = accounts => ({
  type: 'SET_ACCOUNTS',
  accounts
});

export const addContact = (accountId, contact) => ({
  type: 'ADD_CONTACT',
  id: accountId,
  contact
});
