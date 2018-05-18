export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return [...state, action.account];
    case 'SET_ACCOUNTS':
      return action.accounts;
    default:
      return state;
  }
};
