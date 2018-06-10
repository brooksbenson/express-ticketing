import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  setActiveTicket,
  unsetActiveTicket,
  startSetActiveTicket,
  startUnsetActiveTicket
} from '../../actions/active-ticket';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { ticketKeys } from '../fixtures/tickets';
import { contactsObj } from '../fixtures/contacts';
import { comments } from '../fixtures/comments';

const store = configureMockStore([thunk])(storeModel);
const { tickets } = storeModel;

beforeEach(() => {
  store.clearActions();
  db.ref()
    .set(dbModel)
    .then(() => done());
});

test('setActiveTicket should correctly setup action', () => {
  const key = '-i8829dj';
  const action = setActiveTicket(key);
  expect(action).toEqual({
    type: 'SET_ACTIVE_TICKET',
    key
  });
});

test('unsetActiveTicket should setup action correctly', () => {
  const action = unsetActiveTicket();
  expect(action).toEqual({
    type: 'UNSET_ACTIVE_TICKET'
  });
});

test('startSetActiveTicket should set active ticket, account, contacts, and contact', async done => {
  const [key] = ticketKeys;
  await store.dispatch(startSetActiveTicket(key));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_ACTIVE_TICKET',
    key
  });
  expect(actions[1]).toEqual({
    type: 'SET_COMMENTS',
    comments: comments[key]
  });
  expect(actions[2]).toEqual({
    type: 'SET_ACTIVE_ACCOUNT',
    key: tickets[key].accountKey
  });
  expect(actions[3]).toEqual({
    type: 'SET_CONTACTS',
    contacts: contactsObj[tickets[key].accountKey]
  });
  expect(actions[4]).toEqual({
    type: 'SET_ACTIVE_CONTACT',
    key: tickets[key].contactKey
  });
  done();
});

test('startUnsetActiveTicket should unset active ticket, account, contact, contacts, and comments', () => {
  store.dispatch(startUnsetActiveTicket());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'UNSET_ACTIVE_CONTACT'
  });
  expect(actions[1]).toEqual({
    type: 'UNSET_CONTACTS'
  });
  expect(actions[2]).toEqual({
    type: 'UNSET_ACTIVE_ACCOUNT'
  });
  expect(actions[3]).toEqual({
    type: 'UNSET_COMMENTS'
  });
  expect(actions[4]).toEqual({
    type: 'UNSET_ACTIVE_TICKET'
  });
});
