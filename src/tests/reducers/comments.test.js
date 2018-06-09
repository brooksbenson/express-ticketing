import commentsReducer from '../../reducers/comments';
import { addComment, setComments, unsetComments } from '../../actions/comments';
import { ticketKeys } from '../fixtures/tickets';
import { comments } from '../fixtures/comments';

test('commentsReducer should set comments correctly', () => {
  const ticketComments = comments[ticketKeys[0]];
  const action = setComments(ticketComments);
  const state = commentsReducer(null, action);
  expect(state).toEqual(ticketComments);
});

test('commentsReducer should add comment correctly', () => {
  const ticketComments = comments[ticketKeys[0]];
  const key = '8d88888';
  const comment = {
    date: Date.now(),
    userKey: 'aaaaaaa',
    text: 'This is some text.'
  };
  const action = addComment({ key, ...comment });
  const state = commentsReducer(ticketComments, action);
  expect(state[key]).toEqual(comment);
});

test('commentsReducer should unset comments correctly', () => {
  const ticketComments = comments[ticketKeys[0]];
  const action = unsetComments();
  const state = commentsReducer(ticketComments, action);
  expect(state).toEqual(null);
});
