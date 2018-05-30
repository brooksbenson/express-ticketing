export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return [...state, action.ticket];
    default:
      return state;
  }
};
