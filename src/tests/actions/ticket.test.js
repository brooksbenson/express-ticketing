import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { ticketInit } from '../fixtures/tickets';
import users from '../fixtures/users';
import accounts from '../fixtures/accounts';
import contacts from '../fixtures/contacts';
import { startAddTicket } from '../../actions/tickets';
import { startAddContact } from '../../actions/contacts';
import {
  updateUrgency,
  startUpdateUrgency,
  addUser,
  startAddUser,
  addComment,
  startAddComment,
  setTicket,
  startSetTicket
} from '../../actions/ticket';

const createStore = configureMockStore([thunk])({});

let ticket;
beforeEach(done => {
  ticket = ticketInit(Date.now());
  store.clearActions();
  db
    .ref()
    .set(null)
    .then(() => done());
});

test('updateUrgency should correctly setup action object', () => {
  const urgency = 'Low';
  const action = updateUrgency(urgency);
  expect(action).toEqual({
    type: 'UPDATE_URGENCY',
    urgency
  });
});

test('startUpdateUrgency should update urgency in db and dispatch action', done => {
  const urgency = 'Medium';
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    store.dispatch(startUpdateUrgency({ ticketKey, urgency })).then(() => {
      db
        .ref(`tickets/open/${ticketKey}`)
        .once('value')
        .then(snap => {
          expect(snap.val().urgency).toBe(urgency);
          const [, action] = store.getActions();
          expect(action).toEqual({
            type: 'UPDATE_URGENCY',
            urgency
          });
          done();
        });
    });
  });
});

test('addUser should correctly setup action', () => {
  const [, user] = users;
  const action = addUser(user);
  expect(action).toEqual({
    type: 'ADD_USER_TO_TICKET',
    user
  });
});

test('startAddUser should add user to db and dispatch action', done => {
  const { admin, ...user } = users[1];
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    const payload = { ticketKey, user };
    store.dispatch(startAddUser(payload)).then(() => {
      db
        .ref(`tickets/open/${ticketKey}/userKeys`)
        .once('value')
        .then(snap => {
          expect(snap.val()[user.key]).toBeTruthy();
          const [, action] = store.getActions();
          expect(action).toEqual({
            type: 'ADD_USER_TO_TICKET',
            user
          });
          done();
        });
    });
  });
});

test('addComment should correctly setup action', () => {
  const [user] = users;
  const comment = { date: Date.now(), name: user.name, body: 'test' };
  const action = addComment(comment);
  expect(action).toEqual({
    type: 'ADD_COMMENT_TO_TICKET',
    comment
  });
});

test('startAddComment should add comment to db and dispatch action', done => {
  const [user] = users;
  const comment = { date: Date.now(), name: user.name, body: 'test' };
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    const payload = { ticketKey, comment };
    store.dispatch(startAddComment(payload)).then(commentKey => {
      db
        .ref(`comments/${ticketKey}/${commentKey}`)
        .once('value')
        .then(snap => {
          expect(snap.val()).toEqual(comment);
          const [, action] = store.getActions();
          expect(action).toEqual({
            type: 'ADD_COMMENT_TO_TICKET',
            comment
          });
          done();
        });
    });
  });
});

test('setTicket should correctly setup action', () => {
  const action = setTicket(ticket);
  expect(action).toEqual({
    type: 'SET_TICKET',
    ticket
  });
});

test('startSetTicket should get ticket from store and dispatch action', async () => {
  /* 
    Add contact to db
    Create mock ticket key
    Add comment under comments/mockTicketKey

    These things are done becuase the function retrieves 
    the contact and comments from the database.
  */
  const { key, ...contact } = contacts[0];
  const contactKey = await db
    .ref(`contacts/${ticket.accountKey}/`)
    .push(contact).key;
  const mockTicketKey = '-jfdkaj8';
  await db.ref(`comments/${ticketKey}`).push(ticket.comment);
  const store2 = configureMockStore([thunk])({
    accounts,
    users,
    tickets: [
      {
        key: mockTicketKey,
        accountKey: accounts[0].key,
        contactKey,
        userKeys: [users[0].key],
        date: ticket.date
      }
    ]
  });
  const { userKey, comment, contactKey: x, ...storeTicket } = ticket;
  const { key, ...contact } = contacts[0];
  const { key: accountKey } = accounts[0];
  const contactKey = await store.dispatch(
    startAddContact({ contact, accountKey })
  );
  const ticketKey = await store.dispatch(startAddTicket(ticket));
  await store.dispatch({ ...storeTicket, contactKey });
  store.dispatch(startSetTicket(ticket)).then(() => {
    const [, action] = store.getActions();
    expect(action).toEqual({
      type: 'SET_TICKET',
      ticket: {
        date: ticket.date,
        account: accounts[0],
        contact: contacts[0],
        users: [users[0]],
        title: ticket.title,
        urgency: ticket.urgency,
        comments: [ticket.comment]
      }
    });
    done();
  });
});
