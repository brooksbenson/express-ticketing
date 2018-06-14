import React from 'react';
import { shallow } from 'enzyme';
import { ticketsArr } from '../fixtures/tickets';
import { usersObj } from '../fixtures/users';
import TicketControl from '../../components/TicketControl';

const { userKeys, urgency } = ticketsArr[2];

const users = userKeys.map(key => ({ ...usersObj[key], key }));
const className = 'ticket-control';
const isOpen = true;

let onUrgencyChange;
let onStatusChange;
let openAddUserModal;
let wrapper;

beforeEach(() => {
  onUrgencyChange = jest.fn();
  onStatusChange = jest.fn();
  openAddUserModal = jest.fn();
  wrapper = shallow(
    <TicketControl
      className={className}
      isOpen={isOpen}
      users={users}
      onUrgencyChange={onUrgencyChange}
      onStatusChange={onStatusChange}
      openAddUserModal={openAddUserModal}
    />
  );
});

test('TicketControl should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('TicketControl should give wrapper element the className passed as a prop', () => {
  expect(wrapper.hasClass(className)).toBeTruthy();
});

test('TicketControl should invoke onUrgencyChange on urgency change', () => {
  const value = 'high';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(onUrgencyChange).toHaveBeenCalledWith(value);
});

test('TicketControl should render a list of users correctly', () => {
  const userListItems = wrapper.find('li');
  expect(userListItems.at(0).text()).toBe(users[0].name);
  expect(userListItems.at(1).text()).toBe(users[1].name);
});

test('TicketControl should invoke onStatusChange on close ticket button click', () => {
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(onStatusChange).toHaveBeenCalled();
});

test('TicketControl should invoke openAddUserModal on add user button click', () => {
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(openAddUserModal).toHaveBeenCalled();
});

test('TicketControl should render ticket status button with text "Close Ticket" when isOpen prop is true', () => {
  expect(
    wrapper
      .find('button')
      .at(0)
      .text()
  ).toBe('Close Ticket');
});

test('TicketControl should render ticket status button with text "Reopen Ticket" when isOpen prop is false', () => {
  wrapper.setProps({ isOpen: false });
  expect(
    wrapper
      .find('button')
      .at(0)
      .text()
  ).toBe('Reopen Ticket');
});
