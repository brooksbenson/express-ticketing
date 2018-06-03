export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return { ...state, [action.key]: action.account };
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'UPDATE_ACCOUNT':
      return { ...state, [action.key]: action.update };
    default:
      return state;
  }
};
