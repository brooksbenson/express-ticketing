import React from 'react';
import AddUserModal from '../../components/AddUserModal';
import { shallow } from 'enzyme';
import { usersArr } from '../fixtures/users';

let wrapper;
let onSearchChange;
let onAddUser;
let onRequestClose;
let onUserPick;

beforeEach(() => {
  onSearchChange = jest.fn();
  onAddUser = jest.fn();
  onUserPick = jest.fn();
  onRequestClose = jest.fn();
  wrapper = shallow(
    <AddUserModal
      isOpen={true}
      userPicked={false}
      users={usersArr}
      searchString=""
      onRequestClose={onRequestClose}
      onSearchChange={onSearchChange}
      onAddUser={onAddUser}
      onUserPick={onUserPick}
    />
  );
});

test('AddUserModal should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('AddUserModal should pass displayResults, searchString, onSearchChange, onPick, userPicked, and results to SearchBar component', () => {
  const searchBar = wrapper.find('SearchBar');
  expect(searchBar.prop('searchString')).toBe('');
  expect(searchBar.prop('onSearchChange')).toBeTruthy();
  expect(searchBar.prop('onPick')).toBe(onUserPick);
  expect(searchBar.prop('displayResults')).toBeFalsy();
  expect(searchBar.prop('results')).toEqual(usersArr);
});

test('AddUserModal should pass false to SearchBar prop displayResults when user has been picked', () => {
  wrapper.setProps({ searchString: 'Brooks Benson', userPicked: true });
  expect(wrapper.find('SearchBar').prop('displayResults')).toBeFalsy();
});

test('AddUserModal should pass true to SearchBar prop displayResults when user has not been picked', () => {
  wrapper.setProps({ searchString: 'Brooks', userPicked: false });
  expect(wrapper.find('SearchBar').prop('displayResults')).toBeTruthy();
});

test('AddUserModal should pass isOpen, onRequestClose, shouldCloseOnEsc, shouldCloseOnOverlayClick to Modal', () => {
  const modal = wrapper.find('Modal');
  expect(modal.prop('contentLabel')).toBe('Add user modal');
  expect(modal.prop('isOpen')).toBe(true);
  expect(modal.prop('onRequestClose')).toBe(onRequestClose);
  expect(modal.prop('shouldCloseOnEsc')).toBe(true);
  expect(modal.prop('shouldCloseOnOverlayClick')).toBe(true);
});

test('AddUserModal should invoke onRequestClose when close button is clicked', () => {
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(onRequestClose).toHaveBeenCalled();
});

test('AddUserModal should invoke onAddUser on add user button click', () => {
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(onAddUser).toHaveBeenCalled();
});
