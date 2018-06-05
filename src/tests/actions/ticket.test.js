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
  addComment,
  startAddComment,
  setTicket,
  startSetTicket
} from '../../actions/ticket';

const { activeTicketKey } = storeModel;
const { activeUserKey } = storeModel;

const store = configureMockStore([thunk])(storeModel);

beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(dbModel)
    .then(() => done());
});

test('updateUrgency should correctly setup action object', () => {
  const urgency = 'High';
  const key = activeTicketKey;
  const action = updateUrgency({ key, urgency });
  expect(action).toEqual({
    type: 'UPDATE_URGENCY',
    key,
    urgency
  });
});

test('startUpdateUrgency should update urgency in db and dispatch action', async done => {
  const urgency = 'Medium';
  const key = activeTicketKey;
  await store.dispatch(startUpdateUrgency({ key, urgency }));
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
  const ticketKey = activeTicketKey;
  const action = addUser({ ticketKey, userKey });
  expect(action).toEqual({
    type: 'ADD_USER_TO_TICKET',
    ticketKey,
    userKey
  });
});

test('startAddUser should add user to ticket and ticket to user and dispatch action', async done => {
  const userKey = '-83lskdjf';
  const ticketKey = activeTicketKey;
  await store.dispatch(startAddUser({}));
  const [ticketSnap, userTicketsSnap] = await Promise.all([
    db.ref(`tickets/${activeTicketKey}`).once('value'),
    db.ref('user_tickets/${key}').once('value')
  ]);
  expect(ticketSnap.child('userKeys').val()[userKey]).toBeTruthy();
  expect(userTicketsSnap.val()[ticketKey]).toBeTruthy();
  expect(store.getActions()[0]).toEqual({
    type: 'ADD_USER_TO_TICKET',
    ticketKey,
    userKey
  });
  done();
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
  await db.ref(`comments/${mockTicketKey}`).push(ticket.comment);
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
