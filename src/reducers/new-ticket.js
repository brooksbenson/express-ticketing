import store from '../store/store';
import selectAccounts from '../selectors/accounts';
import selectContacts from '../selectors/contacts';

const defaults = {
  account: null,
  accountSearchString: '',
  accountSearchResults: null,
  contact: null,
  contactCtrlData: { name: '', email: '', number: '' },
  contactCtrlOpen: false,
  contactSearchString: '',
  contactSearchResults: null,
  description: '',
  title: '',
  urgency: ''
};

const accounts = () => store.getState().accounts;

export default (state = defaults, action) => {
  switch (action.type) {
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

    case 'CONTACT_CTRL_DATA_CHANGE':
      return { ...state, contactCtrlData: { ...action.change } };
    case 'CONTACT_PICK':
      return {
        ...state,
        contact: action.pick,
        contactCtrlData: { ...action.pick },
        contactCtrlStatus: 'Edit',
        contactSearchString: action.pick.name,
        contactSearchResults: null
      };
    case 'CONTACT_SEARCH_CHANGE':
      return {
        ...state,
        contact: null,
        contactCtrlData: defaults.contactCtrlData,
        contactSearchString: action.change,
        contactSearchResults: selectContacts(
          state.account.contacts,
          action.change
        ),
        contactStatus: 'new'
      };
    case 'DESCRIPTION_CHANGE':
      return { ...state, description: action.change };
    case 'NEW_CONTACT': {
      const contacts = [...state.account.contacts, action.contact];
      return {
        ...state,
        account: { ...state.account, contacts },
        contact: action.contact,
        contactCtrlData: { ...action.contact },
        contactCtrlOpen: false,
        contactSearchString: action.contact.name,
        contactSearchResults: null
      };
    }
    case 'TOGGLE_CONTACT_CTRL':
      return { ...state, contactCtrlOpen: !state.contactCtrlOpen };
    case 'TITLE_CHANGE':
      return { ...state, title: action.change };
    case 'UPDATE_CONTACT': {
      const { update } = action;
      const contacts = state.account.contacts.map(existing => {
        return existing.id === action.update.id ? action.update : existing;
      });
      return {
        account: { ...state.account, contacts },
        contact: update,
        contactCtrlData: { ...update },
        contactCtrlOpen: false,
        contactSearchString: update.name
      };
    }
    case 'URGENCY_CHANGE':
      return { ...state, urgency: action.change };
    default:
      return state;
  }
};
