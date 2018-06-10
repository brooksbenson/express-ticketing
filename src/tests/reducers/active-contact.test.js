import {
  setActiveContact,
  unsetActiveContact
} from '../../actions/active-contact';
import activeContactReducer from '../../reducers/active-contact';

test('activeContactReducer should set active contact', () => {
  const key = 'fjfidoajpf';
  const action = setActiveContact(key);
  const state = activeContactReducer(null, action);
  expect(state).toEqual(key);
});

test('activeContactReducer should unset active contact', () => {
  const action = unsetActiveContact();
  const state = activeContactReducer('fjdkajf', action);
  expect(state).toBe(null);
});
