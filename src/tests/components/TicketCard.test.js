import React from 'react';
import { shallow } from 'enzyme';
import TicketCard from '../../components/TicketCard';

const red = '#ff0000';
const orange = '#ff7400';
const yellow = '#ffc100';

const ticket = {
  key: 'jfkdajf;',
  accountName: 'Walmart',
  title: 'Shipping delay',
  date: 1231234442324,
  urgency: 'high'
};

let wrapper;
let history;

beforeEach(() => {
  history = {
    push: jest.fn()
  };
  wrapper = shallow(<TicketCard {...ticket} history={history} />);
});

test('TicketCard should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('TicketCard should pass red hex color to .urgency when urgency is high', () => {
  const style = expect(wrapper.find('.urgency').prop('style'));
  expect(style.background).toBe(red);
});

test('TicketCard should pass red hex color to .urgency when urgency is medium', () => {
  wrapper.setProps({ urgency: 'medium' });
  const style = expect(wrapper.find('.urgency').prop('style'));
  expect(style.background).toBe(orange);
});

test('TicketCard should pass red hex color to .urgency when urgency is low', () => {
  wrapper.setProps({ urgency: 'low' });
  const style = expect(wrapper.find('.urgency').prop('style'));
  expect(style.background).toBe(yellow);
});
