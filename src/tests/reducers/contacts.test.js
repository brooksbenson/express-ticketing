import contactsReducer from '../../reducers/contacts';
import { addContact, updateContact, setContacts } from '../../actions/contacts';
import { contactsArr, contactsObj } from '../fixtures/contacts';
import { accountKeys } from '../fixtures/accounts';

const [accountKey] = accountKeys;

test('contactsReducer should add contact correctly', () => {
  const key = '4jfidjafd';
  const contact = {
    name: 'Jeremy Street',
    email: 'jeremy@walmart.com',
    number: '8014731143'
  };
  const action = addContact({ key, ...contact });
  const state = contactsReducer(contactsObj[accountKey], action);
  expect(state[key]).toEqual(contact);
});

test('contactsReducer should update contact correctly', () => {
  const { key, ...contact } = contactsArr[0];
  const update = { ...contact, name: 'Jack Smith' };
  const action = updateContact({ key, ...update });
  const state = contactsReducer(contactsObj[accountKey], action);
  expect(state[key]).toEqual(update);
});

test('contactsReducer should set contacts correctly', () => {
  const contacts = contactsObj[accountKey];
  const action = setContacts(contacts);
  const state = contactsReducer(null, action);
  expect(state).toEqual(contacts);
});
