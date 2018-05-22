import accountSelector from '../../selectors/accounts';

const accounts = [
  {
    name: 'cat',
    website: 'www.cats.com'
  },
  {
    name: 'hat',
    website: 'www.hats.net'
  }
];

test('should select no accounts', () => {
  const result = accountSelector(accounts, 'jfd;lakjf;a');
  expect(result.length).toBe(0);
});

test('should select one account by name', () => {
  const [account] = accountSelector(accounts, 'cat');
  expect(account).toEqual(accounts[0]);
});

test('should select both accounts', () => {
  const result = accountSelector(accounts, 'at');
  expect(result.length).toBe(2);
});
