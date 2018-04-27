export default (state = [], action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS': 
      return action.accounts;
    default: 
      return state;
  }
}