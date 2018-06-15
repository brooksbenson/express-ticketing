import React from 'react';
import CommentControl from '../../components/CommentControl';
import { shallow } from 'enzyme';
import { ticketKeys } from '../fixtures/tickets';
import { comments } from '../fixtures/comments';
import { usersObj } from '../fixtures/users';

/*
  The comments prop should be an array where
  each value is an object that has the following
  props: name, date, and text.
*/

const ticketComments = comments[ticketKeys[0]];
const commentsArr = [];

Object.keys(ticketComments).forEach(key => {
  const { userKey, ...rest } = ticketComments[key];
  commentsArr.push({ key, name: usersObj[userKey].name, ...rest });
});

const className = 'comment-control';
let wrapper;
let onCommentChange;
let onCommentSave;

beforeEach(() => {
  onCommentChange = jest.fn();
  onCommentSave = jest.fn();
  wrapper = shallow(
    <CommentControl
      className={className}
      comments={commentsArr}
      comment=""
      onCommentChange={onCommentChange}
      onCommentSave={onCommentSave}
    />
  );
});

test('CommentControl should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('CommentControl wrapper element should have the className passed as a prop', () => {
  expect(wrapper.hasClass(className)).toBeTruthy();
});

test('CommentControl should render the correct number of comments', () => {
  const { length: numberOfComments } = wrapper.find('li');
  expect(numberOfComments).toBe(commentsArr.length);
});

test('CommentControl should render a comment correctly', () => {
  const comment = wrapper.find('li').at(0);
  expect(
    comment
      .find('span')
      .at(0)
      .text()
  ).toBe(commentsArr[0].name);
  expect(
    comment
      .find('span')
      .at(1)
      .text()
  ).toBe(String(commentsArr[0].date));
  expect(
    comment
      .find('p')
      .at(0)
      .text()
  ).toBe(commentsArr[0].text);
});

test('CommentControl should respond correctly textarea change', () => {
  const value = 'Wow. This is bizarre.';
  wrapper.find('textarea').simulate('change', { target: { value } });
  expect(onCommentChange).toHaveBeenCalledWith(value);
});

test('CommentControl should respond to save comment button click correctly', () => {
  wrapper.find('button').simulate('click');
  expect(onCommentSave).toHaveBeenCalled();
});
