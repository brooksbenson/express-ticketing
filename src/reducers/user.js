export default (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.key;
    case 'UNSET_USER':
      return null;
    default:
      return state;
  }
};
