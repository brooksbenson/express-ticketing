export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CONTACT':
      return action.key;
    case 'UNSET_ACTIVE_CONTACT':
      return null;
    default:
      return state;
  }
};
