import contactsReducer from '../../reducers/contacts';
import { addContact, updateContact, setContacts } from '../../actions/contacts';
import { contactsArr, contactsObj } from '../fixtures/contacts';

test('contactsReducer should add contact correctly', () => {
  const key = '4jfidjafd',
  const contact = {
    name: 'Jeremy Street',
    email: 'jeremy@walmart.com',
    number: '8014731143'
  };
  const action = addContact({ key, ...contact });
  const state = contactsReducer(contactsObj, action);
  expect(state[key]).toEqual(contact);
});

test('contactsReducer should update contact correctly', () => {
  const { key } = contactsArr[0];
  const update = {
    ...contactsArr[0],
    name: 'Brooks Bennison'
  };
  const action = updateContact({ key, ...update });
  const state = contactsReducer(contactsObj, action);
  expect(state[key]).toEqual(update);
});

test('contactsReducer should set contacts correctly', () => {
  const action = setContacts(contactsObj);
  const state = contactsReducer(null, action);
  expect(state).toEqual(contactsObj);
});