import React from 'react';
import { shallow } from 'enzyme';
import { ticketsArr } from '../fixtures/tickets';
import { usersObj } from '../fixtures/users';
import TicketControl from '../../components/TicketControl';

const { userKeys, urgency } = ticketsArr[2];

const users = userKeys.map(key => usersObj[key]);

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
      users={users}
      onUrgencyChange={onUrgencyChange}
      onStatusChange={onStatusChange}
      openAddUserModal={openAddUserModal}
    />
  );
});
