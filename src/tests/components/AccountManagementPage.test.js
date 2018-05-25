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
    key: '',
    name: 'Universal Systems',
    website: 'www.universal.com'
  };
  wrapper.setState(state);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  const { key, search, ...account } = state;
  expect(startAddAccountArg).toEqual(account);
});

test('AccountManagementPage should invoke startUpdateAccount prop', () => {
  const state = {
    key: 'fjdka-lj',
    name: 'Universal Systems',
    website: 'www.universal.io'
  };
  wrapper.setState(state);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(startUpdateAccountArg).toEqual(state);
});

test('should respond to cancel update correctly', () => {
  wrapper.setState({ ...accounts[0] });
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(wrapper.state('key')).toBeFalsy();
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
