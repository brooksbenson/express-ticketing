import isEmail from 'validator/lib/isEmail';

export default ({ name, email, number }) => {
  const [first = '', last = ''] = name.split(' ');
  if (first.length < 2) return 'first';
  else if (last.length < 2) return 'last';
  else if (!isEmail(email)) return 'email';
  else if (number.length != 14) return 'number';
  return null;
};
