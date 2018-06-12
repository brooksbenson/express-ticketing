import React from 'react';
import { shallow } from 'enzyme';
import { UserManagementPage } from '../../components/UserManagementPage';
import { usersObj } from '../fixtures/users';

const users = Object.keys(usersObj).map(key => ({ key, ...usersObj[key] }));

let wrapper;
let startAddUserArg;
beforeEach(() => {
  wrapper = shallow(<UserManagementPage users={users} />);
});

test('UserManagementPage should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('UserManagementPage should setState on email change', () => {
  const value = 'Brooks Benson';
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value } });
  expect(wrapper.state('name')).toBe(value);
});

test('UserManagementPage should setState on email change', () => {
  const value = 'brooks@mail.com';
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value } });
  expect(wrapper.state('email')).toBe(value);
});

test('UserManagementPage should setState on password change', () => {
  const value = 'password1';
  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value } });
  expect(wrapper.state('password')).toBe(value);
});

test('should setState on admin checkbox click', () => {
  const checkboxInput = wrapper.find('input[type="checkbox"]');
  checkboxInput.simulate('click');
  expect(wrapper.state('admin')).toBeTruthy();
  checkboxInput.simulate('click');
  expect(wrapper.state('admin')).toBeFalsy();
});
