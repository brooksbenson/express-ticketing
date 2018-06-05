export default (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.key;
    default:
      return state;
  }
};
