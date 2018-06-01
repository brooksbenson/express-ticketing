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
  comment: '',
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
    case 'ACCOUNT_SEARCH_CHANGE': {
      const searchString = action.change;
      return {
        ...state,
        account: null,
        contact: null,
        accountSearchString: searchString,
        accountSearchResults: selectAccounts(accounts(), searchString),
        contactSearchString: '',
        contactSearchResults: null
      };
    }
    case 'ADD_CONTACT': {
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
    case 'COMMENT_CHANGE':
      return { ...state, comment: action.change };

    case 'SET_CONTACTS': {
      const account = { ...state.account, contacts: action.contacts };
      return { ...state, account };
    }
    case 'TOGGLE_CONTACT_CTRL':
      return { ...state, contactCtrlOpen: !state.contactCtrlOpen };
    case 'TITLE_CHANGE':
      return { ...state, title: action.change };
    case 'UPDATE_CONTACT': {
      const { update } = action;
      const contacts = state.account.contacts.map(
        existing => (existing.key === update.key ? update : existing)
      );
      return {
        ...state,
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
