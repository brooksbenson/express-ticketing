export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  }
};
