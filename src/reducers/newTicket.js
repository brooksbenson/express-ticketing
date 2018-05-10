import store from '../store/store';
import selectAccounts from '../selectors/accounts';
import selectContacts from '../selectors/contacts';

const defaults = {
  account: null,
  accountSearchString: '',
  accountSearchResults: null,
  contact: null,
  contactSearchString: '',
  contactSearchResults: null,
  description: '',
  title: '',
  urgency: ''
};

const accounts = () => store.getState().accounts;

export default (state = defaults, action) => {
  switch (action.type) {
    case 'ACCOUNT_BLUR':
      return { ...state, accountSearchResults: null };
    case 'ACCOUNT_PICK':
      return {
        ...state,
        account: action.pick,
        accountSearchString: action.pick.name,
        accountSearchResults: null
      };
    case 'ACCOUNT_SEARCH_CHANGE':
      return {
        ...state,
        account: null,
        contact: null,
        accountSearchString: action.change,
        accountSearchResults: selectAccounts(accounts(), action.change),
        contactSearchString: '',
        contactSearchResults: null
      };
    case 'CONTACT_BLUR':
      return {
        ...state,
        contactSearchResults: null
      };
    case 'CONTACT_PICK':
      return {
        ...state,
        contact: action.pick,
        contactSearchString: action.pick.name,
        contactSearchResults: null
      };
    case 'CONTACT_SEARCH_CHANGE':
      return {
        ...state,
        contact: null,
        contactSearchString: action.change,
        contactSearchResults: selectContacts(
          state.account.contacts,
          action.change
        )
      };
    case 'DESCRIPTION_CHANGE':
      return { ...state, description: action.change };
    case 'TITLE_CHANGE':
      return { ...state, title: action.change };
    case 'URGENCY_CHANGE':
      return { ...state, urgency: action.change };
    default:
      return state;
  }
};
