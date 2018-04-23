import selectContacts from '../../selectors/contacts';
import contacts from '../../fixtures/contacts';

test('should select Warren Buffet by name', () => {
  const query = 'warren';
  const result = selectContacts(contacts, query);
  expect(result[0].name).toBe('Warren Buffet');
});

test('should select Warren Buffet by number', () => {
  const query = '3587658900';
  const result = selectContacts(contacts, query);
  expect(result[0].name).toBe('Warren Buffet');
});

test('should select Warren Buffet by email', () => {
  const query = 'warren@bh.com';
  const result = selectContacts(contacts, query);
  expect(result[0].name).toBe('Warren Buffet');
});

test('should select multiple contacts with partial query', () => {
  const query = '801';
  const result = selectContacts(contacts, query);
  expect(result.length).toBeGreaterThan(1);
});