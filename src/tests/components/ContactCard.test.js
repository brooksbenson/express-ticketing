import React from 'react';
import { shallow } from 'enzyme';
import { contactsArr } from './../fixtures/contacts';
import ContactCard from '../../components/ContactCard';

const { key, ...contact } = contactsArr[0];

test('ContactCard should match snapshot', () => {
  const wrapper = shallow(<ContactCard {...contact} />);
  expect(wrapper).toMatchSnapshot();
});

test('ContactCard should assign wrapper element the class provided by the className prop', () => {
  const wrapper = shallow(
    <ContactCard {...contact} className="contact-card" />
  );
  expect(wrapper.hasClass('contact-card')).toBeTruthy();
});

test('ContactCard should correctly render contact data', () => {
  const wrapper = shallow(<ContactCard {...contact} />);
  const listItemNodes = wrapper.find('li');
  expect(listItemNodes.at(0).text()).toBe(contact.name);
  expect(listItemNodes.at(1).text()).toBe(contact.email);
  expect(listItemNodes.at(2).text()).toBe(contact.number);
});
