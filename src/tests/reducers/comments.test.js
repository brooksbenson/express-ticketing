import commentsReducer from '../../reducers/comments';
import { addComment, setComments, unsetComments } from '../../actions/comments';
import { ticketsArr, comments } from '../fixtures/tickets';

test('commentsReducer should set comments correctly', () => {
  const { key } = ticketsArr[0];
  const ticketComments = comments[key];
  const action = setComments(ticketComments);
  const state = commentsReducer(null, action);
  expect(state).toEqual(ticketComments);
});

test('commentsReducer should add comment correctly', () => {
  const { key } = ticketsArr[0];
  const ticketComments = comments[key];
  const comment = {
    key: '-8jdiso3',
    date: Date.now(),
    userKey: 'jfkdls;a',
    text: 'This is some text.'
  };
  const action = addComment(comment);
  const state = commentsReducer(ticketComments, action);
  expect(state).toEqual({ ...ticketComments, [action.key]: action.comment });
});

test('commentsReducer should unset comments correctly', () => {
  const { key } = ticketsArr[0];
  const ticketComments = comments[key];
  const action = unsetComments();
  const state = commentsReducer(ticketComments, action);
  expect(state).toEqual(null);
});
