export default (state = null, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, [action.key]: action.contact };
    case 'SET_CONTACTS':
      return action.contacts;
    case 'UPDATE_CONTACT':
      return { ...state, [action.key]: action.update };
    default:
      return state;
  }
};
