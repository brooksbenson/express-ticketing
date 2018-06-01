import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { ticketInit } from '../fixtures/tickets';
import users from '../fixtures/users';
import accounts from '../fixtures/accounts';
import contacts from '../fixtures/contacts';

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

const store = configureMockStore([thunk])({});
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

test('startSetTicket should get ticket from db and dispatch action', done => {
  store.dispatch(startAddTicket(ticket)).then(ticketKey => {
    store.dispatch(startSetTicket(ticketKey)).then(() => {
      const [, action] = store.getActions();
      expect(action).toEqual({
        type: 'SET_TICKET'
      });
    });
  });
});
