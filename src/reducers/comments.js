export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return { ...state, [action.key]: action.comment };
    case 'SET_COMMENTS':
      return action.comments;
    case 'UNSET_COMMENTS':
      return {};
    default:
      return state;
  }
};
