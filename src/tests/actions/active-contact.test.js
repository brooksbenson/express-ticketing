import { setContact, unsetContact } from '../../actions/active-contact';

test('setContact should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setContact(key);
  expect(action).toEqual({
    type: 'SET_CONTACT',
    key
  });
});

test('unsetContact should setup action correctly', () => {
  const action = unsetContact();
  expect(action).toEqual({
    type: 'UNSET_CONTACT'
  });
});
