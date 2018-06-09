import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { ticketKeys } from '../fixtures/tickets';
import { comments } from '../fixtures/comments';
import {
  addComment,
  startAddComment,
  setComments,
  startSetComments,
  unsetComments
} from '../../actions/comments';

const store = configureMockStore([thunk])(storeModel);

beforeEach(done => {
  store.clearActions();
  db.ref()
    .set(dbModel)
    .then(() => done());
});

test('addComment should correctly setup action', () => {
  const key = '3333333';
  const comment = {
    date: Date.now(),
    userKey: '111111',
    text: 'Just some text'
  };
  const action = addComment({ key, ...comment });
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    key,
    comment
  });
});

test('startAddComment should add comment to db and dispatch action', async done => {
  const { activeUserKey: userKey, activeTicketKey: ticketKey } = storeModel;
  const text = 'String data is very expressive';
  const key = await store.dispatch(startAddComment(text));
  const snap = await db.ref(`comments/${ticketKey}`).once('value');
  const [action] = store.getActions();
  expect(snap.val()[key]).toEqual({
    date: expect.any(Number),
    userKey,
    text
  });
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    key,
    comment: {
      date: expect.any(Number),
      userKey,
      text
    }
  });
  done();
});

test('setComments should correctly setup action', () => {
  const ticketComments = comments[ticketKeys[0]];
  const action = setComments(ticketComments);
  expect(action).toEqual({
    type: 'SET_COMMENTS',
    comments: ticketComments
  });
});

test('startSetComments should fetch comments from db and dispatch action', async done => {
  const ticketComments = comments[storeModel.activeTicketKey];
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
