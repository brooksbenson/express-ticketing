import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { startAddTicket } from '../../actions/ticket';
import { ticketInit } from '../fixtures/tickets';

const store = configureMockStore([thunk])([]);

let ticket;
beforeEach(() => {
  store.clearActions();
  ticket = ticketInit(Date.now());
});

test('should save ticket display data under ref userTickets/userKey/open', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    db
      .ref(`userTickets/${ticket.user.key}/open/${ticketKey}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.child('date').val()).toBe(ticket.date);
        expect(snapshot.child('accountName').val()).toBe(ticket.account.name);
        expect(snapshot.child('contactName').val()).toBe(ticket.contact.name);
        expect(snapshot.child('title').val()).toBe(ticket.title);
        expect(snapshot.child('urgency').val()).toBe(ticket.urgency);
        done();
      });
  });
});

test('should save ticket display data under ref accountTickets/accountKey/open', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    db
      .ref(`accountTickets/${ticket.account.key}/open/${ticketKey}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.child('date').val()).toBe(ticket.date);
        expect(snapshot.child('accountName').val()).toBe(ticket.account.name);
        expect(snapshot.child('contactName').val()).toBe(ticket.contact.name);
        expect(snapshot.child('title').val()).toBe(ticket.title);
        expect(snapshot.child('urgency').val()).toBe(ticket.urgency);
        done();
      });
  });
});

test('should save ticket display data under ref contactTickets/contactKey/open', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    db
      .ref(`accountTickets/${ticket.account.key}/open/${ticketKey}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.child('accountName').val()).toBe(ticket.account.name);
        expect(snapshot.child('contactName').val()).toBe(ticket.contact.name);
        expect(snapshot.child('date').val()).toBe(ticket.date);
        expect(snapshot.child('title').val()).toBe(ticket.title);
        expect(snapshot.child('urgency').val()).toBe(ticket.urgency);
        done();
      });
  });
});

test('should save ticket data under ref tickets/open', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    db
      .ref(`tickets/open/${ticketKey}`)
      .once('value')
      .then(ticketSnapshot => {
        expect(ticketSnapshot.child('date').val()).toBe(ticket.date);
        expect(ticketSnapshot.child('account').val()).toEqual(ticket.account);
        expect(ticketSnapshot.child('contact').val()).toEqual(ticket.contact);
        expect(ticketSnapshot.child('title').val()).toBe(ticket.title);
        expect(ticketSnapshot.child('urgency').val()).toBe(ticket.urgency);
        ticketSnapshot.child('comments').forEach(child => {
          expect(child.val()).toEqual(ticket.comment);
        });
        ticketSnapshot.child('users').forEach(child => {
          expect(child.val()).toEqual(ticket.user);
        });
        done();
      });
  });
});

test('should correctly save ticket to store', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_TICKET',
      ticket: {
        key: ticketKey,
        date: ticket.date,
        users: [ticket.user],
        account: ticket.account,
        contact: ticket.contact,
        title: ticket.title,
        urgency: ticket.urgency,
        comments: [ticket.comment]
      }
    });
    done();
  });
});
