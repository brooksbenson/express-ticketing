import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { accountsArr, accountsObj } from '../fixtures/accounts';
import { contactsArr, contactsObj } from '../fixtures/contacts';
import { usersArr, usersObj } from '../fixtures/users';
import {
  addTicket,
  startAddTicket,
  setTickets,
  startSetTickets
} from '../../actions/tickets';
import {
  ticketsArr,
  tickets,
  comments,
  open_tickets,
  user_tickets,
  ticketInit
} from '../fixtures/tickets';

const store = configureMockStore([thunk])([]);

let ticket;
beforeEach(async done => {
  store.clearActions();
  ticket = ticketInit(Date.now());
  await db.ref('').set(null);
  await db.ref({
    tickets,
    comments,
    open_tickets,
    user_tickets
  });
});

test('addTicket should setup action correctly', () => {
  const { comment, userKey, ...rest } = ticket;
  const action = addTicket({ userKey, ...rest });
  expect(action).toEqual({
    type: 'ADD_TICKET',
    ticket: {
      ...rest,
      userKeys: [userKey]
    }
  });
});

test('startAddTicket should save ticket in db', done => {
  store.dispatch(startAddTicket(ticket)).then(async key => {
    const snap = await db.ref(`tickets/${key}`).once('value');
    expect(snap.val()).toEqual({
      accountKey: ticket.accountKey,
      contactKey: ticket.contactKey,
      userKeys: { [ticket.userKey]: true },
      date: ticket.date,
      title: ticket.title,
      urgency: ticket.urgency
    });
    done();
  });
});

test('startAddTicket should save comment in db', done => {
  store.dispatch(startAddTicket(ticket)).then(async key => {
    const snap = await db.ref('comments/${key}').once('value');
    const comments = snap.val();
    const [commentKey] = Object.keys(comments);
    expect(comments[commentKey]).toEqual(ticket.comment);
    done();
  });
});

test('startAddTicket should save ticket key under ref open_tickets', done => {
  store.dispatch(startAddTicket(ticket)).then(async key => {
    const snap = await db.ref(`open_tickets`).once('value');
    expect(snap.val()[key]).toBeTruthy();
    done();
  });
});

test('startAddTicket should save ticket key under ref user_tickets/user_key', done => {
  store.dispatch(startAddTicket(ticket)).then(async key => {
    const snap = db.ref(`user_tickets/${ticket.userKey}/`).once('value');
    expect(snap.val()).toHaveProperty(key);
    done();
  });
});

test('startAddTicket should correctly dispatch action', done => {
  store.dispatch(startAddTicket(ticket)).then(key => {
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_TICKET',
      ticket: {
        key: key,
        accountKey: ticket.accountKey,
        contactKey: ticket.contactKey,
        userKeys: { [ticket.userKey]: true },
        date: ticket.date,
        title: ticket.title,
        urgency: ticket.urgency
      }
    });
    done();
  });
});

test('setTickets should correctly setup action', () => {
  const action = setTickets(ticketsObj);
  expect(action).toEqual({
    type: 'SET_TICKETS',
    tickets: ticketsObj
  });
});

test('startSetTickets should fetch user tickets that are open and dispatch action', done => {
  const [ticket] = ticketsArr;
  store.dispatch(startSetTickets(ticket.userKey)).then(() => {
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'SET_TICKETS',
      tickets: { [ticket.key]: tickets[ticket.key] }
    });
    done();
  });
});
