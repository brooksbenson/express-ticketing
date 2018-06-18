import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import {
  updateUrgency,
  startUpdateUrgency,
  addUser,
  startAddUser,
  updateStatus,
  startUpdateStatus,
  startCloseTicket,
  startReopenTicket
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
  const key = '-3848309';
  const urgency = 'High';
  const action = updateUrgency({ key, urgency });
  expect(action).toEqual({
    type: 'UPDATE_URGENCY',
    key,
    urgency
  });
});

test('startUpdateUrgency should update urgency in db and dispatch action', async done => {
  const urgency = 'Medium';
  await store.dispatch(startUpdateUrgency(urgency));
  const snap = await db.ref(`tickets/${activeTicketKey}/urgency`).once('value');
  expect(snap.val()).toBe(urgency);
  expect(store.getActions()[0]).toEqual({
    type: 'UPDATE_URGENCY',
    key: activeTicketKey,
    urgency
  });
  done();
});

test('addUser should correctly setup action', () => {
  const key = '-38383';
  const userKey = '-ikdoenvc';
  const action = addUser({ key, userKey });
  expect(action).toEqual({
    type: 'ADD_USER_TO_TICKET',
    key,
    userKey
  });
});

test('startAddUser should add user to ticket and ticket to user and dispatch action', async done => {
  const userKey = '-83lskdjf';
  await store.dispatch(startAddUser(userKey));
  const [ticketUsers, userTickets] = await Promise.all([
    db.ref(`tickets/${activeTicketKey}/userKeys`).once('value'),
    db.ref(`user_tickets/${userKey}`).once('value')
  ]);
  expect(ticketUsers.val()).toHaveProperty(userKey);
  expect(userTickets.val()).toHaveProperty(activeTicketKey);
  expect(store.getActions()[0]).toEqual({
    type: 'ADD_USER_TO_TICKET',
    key: activeTicketKey,
    userKey
  });
  done();
});

test('updateStatus should correctly setup action', () => {
  const key = '-834848';
  const status = 'closed';
  const action = updateStatus({ key, status });
  expect(action).toEqual({
    type: 'UPDATE_STATUS',
    key,
    status
  });
});

test('startUpdateStatus should correctly update the ticket status in db and dispatch action', async done => {
  const status = 'closed';
  await store.dispatch(startUpdateStatus(status));
  const [action] = store.getActions();
  const snap = await db.ref(`tickets/${activeTicketKey}/status`).once('value');
  expect(snap.val()).toBe(status);
  expect(action).toEqual({
    type: 'UPDATE_STATUS',
    key: activeTicketKey,
    status
  });
  done();
});

test('startCloseTicket should move ticket key from open_tickets to closed_tickets', async done => {
  await store.dispatch(startCloseTicket());
  const openTicketSnap = await db
    .ref(`open_tickets/${activeTicketKey}`)
    .once('value');
  const closeTicketSnap = await db
    .ref(`closed_tickets/${activeTicketKey}`)
    .once('value');
  expect(openTicketSnap.val()).toBeFalsy();
  expect(closeTicketSnap.val()).toBeTruthy();
  done();
});

test('startCloseTicket should update the ticket status to closed and dispatch action', async done => {
  await store.dispatch(startCloseTicket());
  const snap = await db.ref(`tickets/${activeTicketKey}/status`).once('value');
  const [action] = store.getActions();
  expect(snap.val()).toBe('closed');
  expect(action).toEqual({
    type: 'UPDATE_STATUS',
    key: activeTicketKey,
    status: 'closed'
  });
  done();
});

test('startReopenTicket should move the ticket key from closed_tickets to open_tickets', async done => {
  await store.dispatch(startReopenTicket());
  const openTicketSnap = await db
    .ref(`open_tickets/${activeTicketKey}`)
    .once('value');
  const closeTicketSnap = await db
    .ref(`closed_tickets/${activeTicketKey}`)
    .once('value');
  expect(openTicketSnap.val()).toBeTruthy();
  expect(closeTicketSnap.val()).toBeFalsy();
  done();
});

test('startReopenTicket should update the tickets status to open and dispatch action', async done => {
  await store.dispatch(startReopenTicket());
  const snap = await db.ref(`tickets/${activeTicketKey}/status`).once('value');
  const [action] = store.getActions();
  expect(snap.val()).toBe('open');
  expect(action).toEqual({
    type: 'UPDATE_STATUS',
    key: activeTicketKey,
    status: 'open'
  });
  done();
});
