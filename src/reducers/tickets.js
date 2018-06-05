export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return { ...state, [action.key]: action.ticket };
    case 'SET_TICKETS':
      return action.tickets;
    case 'UPDATE_URGENCY': {
      const { key, urgency } = action;
      const ticket = state[key];
      return { ...state, [key]: { ...ticket, urgency } };
    }
    case 'ADD_USER': {
      const { key, userKey } = action;
      const ticket = state[key];
      const userKeys = { ...ticket.userKeys, [userKey]: true };
      return { ...state, [key]: { ...ticket, userKeys } };
    }
    default:
      return state;
  }
};
