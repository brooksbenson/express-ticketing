export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return [...state, action.account];
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'UPDATE_ACCOUNT':
      return state.map(
        account => (account.key === action.update.key ? action.update : account)
      );
    default:
      return state;
  }
};
