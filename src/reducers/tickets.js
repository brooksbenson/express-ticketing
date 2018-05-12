export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return [...state, action.ticket];
    default:
      return state;
  }
};
// {
//   account: id,
//   contact: id,
//   urgency: low|medium|high,
//   title: String,
//   comments: [id, id, id],
//   users: [id...]
// }
