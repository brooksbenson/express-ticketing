export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ACCOUNT':
      return action.key;
    case 'UNSET_ACTIVE_ACCOUNT':
      return null;
    default:
      return state;
  }
};
