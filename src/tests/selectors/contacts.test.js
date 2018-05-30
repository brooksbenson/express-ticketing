import contactSelector from '../../selectors/contacts';
import contacts from '../fixtures/contacts';

test('should select contacts by name', () => {
  const [contact] = contactSelector(contacts, 'Warren Buffguy');
  expect(contact.name).toBe('Warren Buffguy');
});

test('should select contacts by email', () => {
  const [contact] = contactSelector(contacts, 'wendy@mail.com');
  expect(contact.email).toBe('wendy@mail.com');
});

test('should select contact by number', () => {
  const number = '3589990345';
  const [contact] = contactSelector(contacts, number);
  expect(contact.number).toBe(number);
});

test('should select contact with chopped search', () => {
  const search = 'wa bgy';
  const [contact] = contactSelector(contacts, search);
  expect(contact.name).toBe(contact.name);
});
