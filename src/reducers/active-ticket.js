export default (state = null, action) => {
  switch (action.type) {
    case 'SET_TICKET':
      return action.key;
    case 'UNSET_TICKET':
      return null;
    default:
      return state;
  }
};
