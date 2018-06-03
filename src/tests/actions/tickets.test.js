import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { addTicket, startAddTicket } from '../../actions/tickets';
import { ticketInit } from '../fixtures/tickets';

const store = configureMockStore([thunk])([]);

let ticket;
beforeEach(done => {
  store.clearActions();
  ticket = ticketInit(Date.now());
  db
    .ref()
    .set(null)
    .then(() => done());
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

test('startAddTicket should save comments in db', done => {
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
