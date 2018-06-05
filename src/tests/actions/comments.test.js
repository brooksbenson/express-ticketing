import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { ticketsArr, comments } from '../fixtures/tickets';
import {
  addComment,
  startAddComment,
  setComments,
  startSetComments,
  unsetComments
} from '../../actions/comments';

const store = configureMockStore([thunk])(storeModel);
const { activeTicketKey, activeUserKey } = storeModel;

beforeEach(done => {
  store.clearActions();
  db
    .ref()
    .set(dbModel)
    .then(() => done());
});

test('addComment should correctly setup action', () => {
  const key = 'fjdakl;jf;ad';
  const comment = {
    date: Date.now(),
    userKey: activeUserKey,
    text: 'jfdkaljfd;askjf;dsafkj'
  };
  const action = addComment({ key, ...comment });
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    key,
    comment
  });
});

test('startAddComment should add comment to db and dispatch action', async done => {
  const text = 'String data is very expressive';
  const key = await store.dispatch(startAddComment(text));
  const [action] = store.getActions();
  const snap = await db.ref(`comments/${activeTicketKey}`);
  expect(snap.val()[key]).toEqual({
    date: expect.any(Number),
    userKey: activeUserKey,
    text
  });
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    date: expect.any(Number),
    userKey: activeUserKey,
    text
  });
  done();
});

test('setComments should correctly setup action', () => {
  const { key } = ticketsArr[0];
  const ticketComments = comments[key];
  const action = setComments(ticketComments);
  expect(action).toEqual({
    type: 'SET_COMMENTS',
    comments: ticketComments
  });
});

test('startSetComments should fetch comments from db and dispatch action', async done => {
  const ticketComments = comments[activeTicketKey];
  await store.dispatch(startSetComments());
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'SET_COMMENTS',
    comments: ticketComments
  });
  done();
});

test('unsetComments should correctly setup action', () => {
  const action = unsetComments();
  expect(action).toEqual({ type: 'UNSET_COMMENTS' });
});
