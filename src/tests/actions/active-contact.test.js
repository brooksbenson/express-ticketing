import {
  setActiveContact,
  unsetActiveContact
} from '../../actions/active-contact';

test('setActiveContact should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setActiveContact(key);
  expect(action).toEqual({
    type: 'SET_ACTIVE_CONTACT',
    key
  });
});

test('unsetActiveContact should setup action correctly', () => {
  const action = unsetActiveContact();
  expect(action).toEqual({
    type: 'UNSET_ACTIVE_CONTACT'
  });
});
