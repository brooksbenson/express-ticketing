import usersSelector from '../../selectors/users';

const users = [
  {
    email: 'brooks@mail.com'
  },
  {
    email: 'max@mail.com'
  },
  {
    email: 'nick@mail.com'
  }
];

test('should select no users', () => {
  const result = usersSelector(users, 'jfdkaj;fa');
  expect(result.length).toBe(0);
});

test('should select one user', () => {
  const result = usersSelector(users, 'brooks');
  expect(result[0].email).toBe('brooks@mail.com');
});

test('should select all users', () => {
  const result = usersSelector(users, 'mail.com');
  expect(result.length).toBe(3);
});
