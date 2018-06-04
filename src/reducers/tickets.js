export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return action.tickets;
    case 'ADD_TICKET':
      return { ...state, [action.key]: action.ticket };
    default:
      return state;
  }
};
