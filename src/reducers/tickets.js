export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return { ...state, [action.key]: action.ticket };
    case 'SET_TICKETS':
      return action.tickets;
    case 'UPDATE_URGENCY': {
      const { key, urgency } = action;
      const ticket = { ...state[key], urgency };
      return { ...state, [key]: ticket };
    }
    case 'ADD_USER_TO_TICKET': {
      const { key, userKey } = action;
      const userKeys = { ...state[key].userKeys, [userKey]: true };
      return { ...state, [key]: { ...state[key], userKeys } };
    }
    default:
      return state;
  }
};
