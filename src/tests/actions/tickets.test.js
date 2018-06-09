import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  addTicket,
  startAddTicket,
  setTickets,
  startSetTickets
} from '../../actions/tickets';
import storeModel from '../fixtures/store-model';
import dbModel from '../fixtures/db-model';
import {
  ticketsArr,
  ticketsObj,
  ticketInit,
  userTickets
} from '../fixtures/tickets';

const { activeAccountKey, activeContactKey, activeUserKey } = storeModel;
const store = configureMockStore([thunk])(storeModel);

beforeEach(async done => {
  store.clearActions();
  await db.ref().set(dbModel);
  done();
});

test('addTicket should setup action correctly', () => {
  const key = '-88204';
  const ticket = {
    date: Date.now(),
    accountKey: activeAccountKey,
    contactKey: activeContactKey,
    userKeys: { [activeUserKey]: true },
    ...ticketInit()
  };
  const action = addTicket({ key, ...ticket });
  expect(action).toEqual({
    type: 'ADD_TICKET',
    key,
    ticket
  });
});

test('startAddTicket should save ticket in db', async done => {
  const ticket = ticketInit();
  const key = await store.dispatch(startAddTicket(ticket));
  const snap = await db.ref(`tickets/${key}`).once('value');
  expect(snap.val()).toEqual({
    date: expect.any(Number),
    title: ticket.title,
    urgency: ticket.urgency,
    accountKey: activeAccountKey,
    contactKey: activeContactKey,
    userKeys: { [activeUserKey]: true }
  });
  done();
});

test('startAddTicket should save ticket key under ref open_tickets', async done => {
  const ticket = ticketInit();
  const key = await store.dispatch(startAddTicket(ticket));
  const snap = await db.ref(`open_tickets`).once('value');
  expect(snap.val()).toHaveProperty(key);
  done();
});

test('startAddTicket should save ticket key under ref user_tickets/user_key', async done => {
  const ticket = ticketInit();
  const key = await store.dispatch(startAddTicket(ticket));
  const snap = await db.ref(`user_tickets/${activeUserKey}/`).once('value');
  expect(snap.val()).toHaveProperty(key);
  done();
});

test('startAddTicket should correctly dispatch action', async done => {
  const ticket = ticketInit();
  const key = await store.dispatch(startAddTicket(ticket));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_TICKET',
    key,
    ticket: {
      date: expect.any(Number),
      accountKey: activeAccountKey,
      contactKey: activeContactKey,
      userKeys: { [activeUserKey]: true },
      title: ticket.title,
      urgency: ticket.urgency
    }
  });
  done();
});

test('setTickets should correctly setup action', () => {
  const action = setTickets(ticketsObj);
  expect(action).toEqual({
    type: 'SET_TICKETS',
    tickets: ticketsObj
  });
});

test('startSetTickets should fetch user tickets that are open and dispatch action', async done => {
  await store.dispatch(startSetTickets());
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'SET_TICKETS',
    tickets: storeModel.tickets
  });
  done();
});
