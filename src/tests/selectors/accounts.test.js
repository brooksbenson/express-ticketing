import selectAccounts from '../../selectors/accounts';
import accounts from '../fixtures/accounts';

test('should select flower motors by name', () => {
  const query = 'flower motors';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Flower Motors');
});

test('should select dynamic foods with partial query', () => {
  const query = 'dyf';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Dynamic Foods');
});

test('should select dynamic foods by website', () => {
  const query = 'www.fooddynamics.com';
  const result = selectAccounts(accounts, query);
  expect(result[0].name).toBe('Dynamic Foods');
});

test('should select multiple accounts with partial query', () => {
  const query = 'e';
  const result = selectAccounts(accounts, query);
  expect(result.length).toBeGreaterThan(1);
});
