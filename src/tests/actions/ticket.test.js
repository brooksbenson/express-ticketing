import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import {
  updateUrgency,
  startUpdateUrgency,
  addUser,
  startAddUser
} from '../../actions/ticket';

const { activeTicketKey } = storeModel;
const { activeUserKey } = storeModel;

const store = configureMockStore([thunk])(storeModel);

beforeEach(done => {
  store.clearActions();
  db.ref()
    .set(dbModel)
    .then(() => done());
});

test('updateUrgency should correctly setup action object', () => {
  const urgency = 'High';
  const action = updateUrgency(urgency);
  expect(action).toEqual({
    type: 'UPDATE_URGENCY',
    key: activeTicketKey,
    urgency
  });
});

test('startUpdateUrgency should update urgency in db and dispatch action', async done => {
  const urgency = 'Medium';
  const key = activeTicketKey;
  await store.dispatch(startUpdateUrgency(urgency));
  const snap = await db.ref('tickets/${key}/urgency').once('value');
  expect(snap.val()).toBe(urgency);
  expect(store.getActions()[0]).toEqual({
    type: 'UPDATE_URGENCY',
    key,
    urgency
  });
  done();
});

test('addUser should correctly setup action', () => {
  const userKey = '-ikdoenvc';
  const action = addUser(userKey);
  expect(action).toEqual({
    type: 'ADD_USER_TO_TICKET',
    key: activeTicketKey,
    userKey
  });
});

test('startAddUser should add user to ticket and ticket to user and dispatch action', async done => {
  const userKey = '-83lskdjf';
  const key = activeTicketKey;
  await store.dispatch(startAddUser(userKey));
  const [userKeysSnap, userTicketsSnap] = await Promise.all([
    db.ref(`tickets/${key}/userKeys`).once('value'),
    db.ref('user_tickets/${userKey}/${key}').once('value')
  ]);
  expect(userKeysSnap.val()[userKey]).toBeTruthy();
  expect(userTicketsSnap.val()[ticketKey]).toBeTruthy();
  expect(store.getActions()[0]).toEqual({
    type: 'ADD_USER_TO_TICKET',
    key,
    userKey
  });
  done();
});
