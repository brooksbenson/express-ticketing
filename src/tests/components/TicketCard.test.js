import React from 'react';
import { shallow } from 'enzyme';
import TicketCard from '../../components/TicketCard';

const red = '#ff0000';
const orange = '#ff7400';
const yellow = '#ffc100';

const ticket = {
  ticketKey: 'jfkdajf;',
  accountName: 'Walmart',
  title: 'Shipping delay',
  date: 1231234442324,
  urgency: 'high'
};

const className = 'ticket-card';

let wrapper;
let history;

beforeEach(() => {
  history = {
    push: jest.fn()
  };
  wrapper = shallow(
    <TicketCard className={className} history={history} {...ticket} />
  );
});

test('TicketCard should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('TicketCard should assign the wrapper className to the className passed as a prop', () => {
  expect(wrapper.hasClass(className)).toBeTruthy();
});

test('TicketCard should pass red hex color to .urgency when urgency is high', () => {
  const style = wrapper.find('.urgency').prop('style');
  expect(style.background).toBe(red);
});

test('TicketCard should pass orange hex color to .urgency when urgency is medium', () => {
  wrapper.setProps({ urgency: 'medium' });
  const style = wrapper.find('.urgency').prop('style');
  expect(style.background).toBe(orange);
});

test('TicketCard should pass yellow hex color to .urgency when urgency is low', () => {
  wrapper.setProps({ urgency: 'low' });
  const style = wrapper.find('.urgency').prop('style');
  expect(style.background).toBe(yellow);
});

test('TicketCard should invoke the history.push method and pass the ticket key as a parameter when wrapper is clicked on', () => {
  wrapper.simulate('click');
  expect(history.push).toHaveBeenCalledWith(`ticket/${ticket.ticketKey}`);
});
