import { setContact, unsetContact } from '../../actions/active-contact';
import activeContactReducer from '../../reducers/active-contact';

test('activeContactReducer should set contact', () => {
  const key = 'fjfidoajpf';
  const action = setContact(key);
  const state = activeContactReducer(null, action);
  expect(state).toEqual(key);
});

test('activeContactReducer should unset contact', () => {
  const action = unsetContact();
  const state = activeContactReducer('fjdkajf', action);
  expect(state).toBe(null);
});
