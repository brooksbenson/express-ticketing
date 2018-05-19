import React from 'react';
import { shallow } from 'enzyme';
import { AccountManagementPage } from '../../components/AccountManagementPage';
import accounts from '../fixtures/accounts';

let wrapper;
let startAddAccountArg;
beforeEach(() => {
  wrapper = shallow(
    <AccountManagementPage
      accounts={accounts}
      startAddAccount={account => {
        startAddAccountArg = account;
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

test('AccountManagementPage should invoke startAddAccount prop on save', () => {
  const state = {
    name: 'Universal Systems',
    website: 'www.universal.io'
  };
  wrapper.setState(state);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(startAddAccountArg).toEqual(state);
});
