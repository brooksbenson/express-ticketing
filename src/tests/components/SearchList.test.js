import React from 'react';
import { shallow } from 'enzyme';
import SearchList from '../../components/reuse/SearchList';
import accounts from '../fixtures/accounts';
import accountSelector from '../../selectors/accounts';

let wrapper;
let onClick;
beforeEach(() => {
  onClick = jest.fn();
  wrapper = shallow(
    <SearchList
      className="test__list"
      list={accounts}
      onClick={onClick}
      selector={accountSelector}
    />
  );
});

test('should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('wrapper should have class "test__list"', () => {
  expect(wrapper.shouldHaveClass('test__list')).toBeTruthy();
});

test('state should change on search', () => {
  const value = 'foo';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(wrapper.state('search')).toBe(value);
});

test('list length should differ on search', () => {
  const value = 'jfdksa;fdka;fj';
  const preLength = wrapper.find('ul').children().length;
  wrapper.find('input').simulate('change', { target: { value } });
  const postLength = wrapper.find('ul').children().length;
  expect(postLength).toBeLessThan(preLength);
});

test('onClick should fire on list item click', () => {
  wrapper
    .find('li')
    .at(0)
    .simulate('click');
  expect(onClick).toHaveBeenCalled();
});
