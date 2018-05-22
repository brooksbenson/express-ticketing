import React from 'react';
import { shallow } from 'enzyme';
import { AccountManagementPage } from '../../components/AccountManagementPage';
import accounts from '../fixtures/accounts';

let wrapper;
let startAddAccountArg;
let startUpdateAccountArg;
beforeEach(() => {
  wrapper = shallow(
    <AccountManagementPage
      accounts={accounts}
      startAddAccount={account => {
        startAddAccountArg = account;
        return Promise.resolve();
      }}
      startUpdateAccount={account => {
        startUpdateAccountArg = account;
        return Promise.resolve();
      }}
    />
  );
});

test('AccountManagementPage should match snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

test('AccountManagementPage should setState on name change', () => {
  const value = 'Flower Motors';
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value } });
  expect(wrapper.state('name')).toBe(value);
});

test('AccountManagementPage should setState on website change', () => {
  const value = 'www.flowerpower.com';
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value } });
  expect(wrapper.state('website')).toBe(value);
});

test('AccountManagementPage should invoke startAddAccount prop with account data', () => {
  const state = {
    accountKey: '',
    name: '',
    website: 'www.universal.com',
    search: ''
  };
  wrapper.setState(state);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  const { accountKey, ...accountData } = state;
  expect(startAddAccountArg).toEqual(accountData);
});

test('AccountManagementPage should invoke startUpdateAccount prop', () => {
  const state = {
    accountKey: 'fjdka-lj',
    name: 'Universal Systems',
    website: 'www.universal.io',
    search: ''
  };
  wrapper.setState(state);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(startUpdateAccountArg).toEqual(state);
});

test('AccountManagementPage should respond to account click correctly', () => {
  const [account] = accounts;
  wrapper
    .find('.manage-accounts__list')
    .children()
    .at(0)
    .simulate('click');
  expect(wrapper.state('accountKey')).toBe(account.key);
  expect(
    wrapper
      .find('form')
      .children()
      .find('button').length
  ).toBe(2);
  expect(
    wrapper
      .find('h3')
      .at(0)
      .text()
  ).toBe('Update Account');
});

test('should respond to cancel update correctly', () => {
  wrapper.setState({ ...accounts[0], accountKey: accounts[0].key });
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(wrapper.state('accountKey')).toBeFalsy();
  expect(
    wrapper
      .find('form')
      .children()
      .find('button').length
  ).toBe(1);
  expect(
    wrapper
      .find('h3')
      .at(0)
      .text()
  ).toBe('New Account');
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
