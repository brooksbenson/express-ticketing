import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { startAddTicket, addTicket } from '../../actions/tickets';
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

test('should setup action correctly', () => {
  const action = addTicket(ticket);
  expect(action).toEqual({
    type: 'ADD_TICKET',
    ticket
  });
});

test('should save ticket data under ref tickets/open', done => {
  store.dispatch(startAddTicket(ticket)).then(key => {
    db
      .ref(`tickets/open/${key}`)
      .once('value')
      .then(snap => {
        expect(snap.child('accountKey').val()).toBe(ticket.accountKey);
        expect(snap.child('contactKey').val()).toBe(ticket.contactKey);
        expect(snap.child('title').val()).toBe(ticket.title);
        expect(snap.child('urgency').val()).toBe(ticket.urgency);
        expect(snap.child('date').val()).toBe(ticket.date);
        expect(
          snap
            .child('userKeys')
            .child(ticket.user.key)
            .val()
        ).toBeTruthy();
        done();
      });
  });
});

test('should save ticket comment under ref comments/key', done => {
  store.dispatch(startAddTicket(ticket)).then(key => {
    db
      .ref(`comments/${key}`)
      .once('value')
      .then(snap => {
        const comments = snap.val();
        expect(comments.c1).toEqual(ticket.comment);
        done();
      });
  });
});

test('should correctly dispatch ticket to store', done => {
  store.dispatch(startAddTicket(ticket)).then(key => {
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_TICKET',
      ticket: {
        key: key,
        accountKey: ticket.accountKey,
        contactKey: ticket.contactKey,
        userKeys: [ticket.user.key],
        date: ticket.date,
        title: ticket.title,
        urgency: ticket.urgency,
        comments: [ticket.comment]
      }
    });
    done();
  });
});
