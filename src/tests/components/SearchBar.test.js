import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../../components/SearchBar';
import accountSelector from '../../selectors/accounts';
import accounts from '../../fixtures/accounts';

let wrapper, onValueSelect;
beforeEach(() => {
  onValueSelect = jest.fn();
  wrapper = shallow(
    <SearchBar
      className="search-bar"
      onValueSelect={onValueSelect}
      placeholder="Search accounts..."
      selector={accountSelector}
      values={accounts}
      valueDisplayProp="name"
    />
  );
});

test('should render SearchBar correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should set search value on input change', () => {
  const value = 'test';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(wrapper.state('searchString')).toBe(value);
});

test('should render search results on input change', () => {
  wrapper.simulate('change', { target: { value: 'a' } });
  expect(wrapper.children('ul')).toBeTruthy();
});

test('should not render search results upon mounting', () => {
  expect(wrapper.children('ul')).toBeFalsy();
});

test('should set searchResults correctly', () => {
  wrapper.simulate('change', { target: { value: 'walmart' } });
  expect(wrapper.state('searchResults').length).toBe(1);
});
