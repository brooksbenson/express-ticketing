import contactSelector from '../../selectors/contacts';
import { contactsArr } from '../fixtures/contacts';
const contacts = contactsArr;

test('should select contacts by name', () => {
  const [contact] = contactSelector(contacts, 'Warren Buffguy');
  expect(contact.name).toBe('Warren Buffguy');
});

test('should select contacts by email', () => {
  const [contact] = contactSelector(contacts, 'wendy@mail.com');
  expect(contact.email).toBe('wendy@mail.com');
});

test('should select contact by number', () => {
  const number = '8015678989';
  const [contact] = contactSelector(contacts, number);
  expect(contact.number).toBe(number);
});

test('should select contact with chopped search', () => {
  const search = 'wa bgy';
  const [contact] = contactSelector(contacts, search);
  expect(contact.name).toBe(contact.name);
});
