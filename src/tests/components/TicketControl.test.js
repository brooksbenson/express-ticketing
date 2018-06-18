import React from 'react';
import { shallow } from 'enzyme';
import { ticketsArr } from '../fixtures/tickets';
import { usersObj } from '../fixtures/users';
import TicketControl from '../../components/TicketControl';

const { userKeys, urgency } = ticketsArr[2];

const users = userKeys.map(key => ({ ...usersObj[key], key }));
const className = 'ticket-control';

let onUrgencyChange;
let onStatusChange;
let openAddUserModal;
let onSave;
let wrapper;

beforeEach(() => {
  onUrgencyChange = jest.fn();
  onStatusChange = jest.fn();
  openAddUserModal = jest.fn();
  onSave = jest.fn();

  wrapper = shallow(
    <TicketControl
      className={className}
      users={users}
      urgency="low"
      status="open"
      onUrgencyChange={onUrgencyChange}
      onStatusChange={onStatusChange}
      openAddUserModal={openAddUserModal}
      onSave={onSave}
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
  wrapper
    .find('select')
    .at(0)
    .simulate('change', { target: { value } });
  expect(onUrgencyChange).toHaveBeenCalledWith(value);
});

test('TicketControl should invoke onStatusChange on status change', () => {
  const value = 'closed';
  wrapper
    .find('select')
    .at(1)
    .simulate('change', { target: { value } });
  expect(onStatusChange).toHaveBeenCalledWith(value);
});

test('TicketControl should render a list of users correctly', () => {
  const userListItems = wrapper.find('li');
  expect(userListItems.at(0).text()).toBe(users[0].name);
  expect(userListItems.at(1).text()).toBe(users[1].name);
});

test('TicketControl should invoke onSave when save button is clicked', () => {
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(onSave).toHaveBeenCalled();
});

test('TicketControl should invoke openAddUserModal on add user button click', () => {
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(openAddUserModal).toHaveBeenCalled();
});
