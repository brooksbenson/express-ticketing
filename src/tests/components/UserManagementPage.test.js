import React from 'react';
import { shallow } from 'enzyme';
import { UserManagementPage } from '../../components/UserManagementPage';
import users from '../fixtures/users';

let wrapper;
let startAddUserArg;
beforeEach(() => {
  wrapper = shallow(<UserManagementPage users={users} />);
});

test('UserManagementPage should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('UserManagementPage should setState on email change', () => {
  const value = 'brooks@mail.com';
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value } });
  expect(wrapper.state('email')).toBe(value);
});

test('UserManagementPage should setState on password change', () => {
  const value = 'password1';
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value } });
  expect(wrapper.state('password')).toBe(value);
});

test('should setState on search change', () => {
  const value = 'walmart';
  wrapper
    .find('.search')
    .at(0)
    .simulate('change', { target: { value } });
  expect(wrapper.state('search')).toBe(value);
});

test('should change list on search', () => {
  const initialListLength = wrapper.find('li').length;
  wrapper.setState({ search: 'flower' });
  const searchListLength = wrapper.find('li').length;
  expect(initialListLength).toBeGreaterThan(searchListLength);
});
