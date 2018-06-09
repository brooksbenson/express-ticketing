export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return action.key;
    case 'UNSET_ACCOUNT':
      return null;
    default:
      return state;
  }
};
