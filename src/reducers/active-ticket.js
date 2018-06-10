export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TICKET':
      return action.key;
    case 'UNSET_ACTIVE_TICKET':
      return null;
    default:
      return state;
  }
};
