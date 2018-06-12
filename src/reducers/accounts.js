export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return { ...state, [action.key]: action.account };
    case 'SET_ACCOUNTS': {
      if (action.accounts === null) return {};
      else return action.accounts;
    }
    case 'UPDATE_ACCOUNT':
      return { ...state, [action.key]: action.update };
    default:
      return state;
  }
};
