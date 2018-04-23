import selectAccounts from '../../selectors/accounts';
import accounts from '../../fixtures/accounts';

test('should select walmart by name', () => {
  const query = 'walmart';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Walmart');
});

test('should select walmart by id', () => {
  const query = '568392';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Walmart');
});

test('should select walmart with partial query', () => {
  const query = 'wt';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Walmart');
});

test('should select multiple account with partial query', () => {
  const query = 'a';
  const result = selectAccounts(accounts, query);
  expect(result.length).toBeGreaterThan(1);
});