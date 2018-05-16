export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return [...accounts, action.account];
    case 'SET_ACCOUNTS':
      return action.accounts;
    default:
      return state;
  }
};

/*
{
  "accounts": {
    "ref": {
      "name": String,
      "website": String
    }
  },
  "contacts": {
    "ref[account]": {
      "ref": {
        "name": String,
        "email": String,
        "number": String
      }
    }
  }
}
*/
