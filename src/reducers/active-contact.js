export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CONTACT':
      return action.key;
    case 'UNSET_CONTACT':
      return null;
    default:
      return state;
  }
};
