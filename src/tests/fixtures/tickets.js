import { usersArr, usersObj } from '../fixtures/users';
import { accountsArr, accountsObj } from '../fixtures/accounts';
import { contactsArr, contactsObj } from '../fixtures/contacts';

const ticketsArr = [
  {
    key: '-iekgjdksl',
    accountKey: accountsArr[0].key,
    contactKey: contactsArr[0].key,
    userKey: usersArr[0].key,
    date: Date.now(),
    title: 'Shipping Delay',
    urgency: 'Low',
    comment: {
      key: 'jfkdapo',
      date: Date.now(),
      name: usersArr[0].name,
      body:
        'Received notice from warehouse #z001 that shippment #y849 was delayed'
    }
  },
  {
    key: '-iekgjdjipp',
    accountKey: accountsArr[1].key,
    contactKey: contactsArr[1].key,
    userKey: usersArr[1].key,
    date: Date.now(),
    title: 'Customer Complaint',
    urgency: 'Low',
    comment: {
      key: 'jiklsp',
      date: Date.now(),
      name: usersArr[1].name,
      body: 'We received a complaint'
    }
  }
];

const tickets = {};
const comments = {};
const open_tickets = {};
const user_tickets = {};

ticketsArr.forEach(({ key, userKey, comment, ...ticket }) => {
  tickets[key] = { ...ticket, userKeys: { [userKey]: true } };
  open_tickets[key] = true;
  user_tickets[userKey] = { [key]: true };
  const { key: commentKey, ...commentInfo } = comment;
  comments[key] = { [commentKey]: commentInfo };
});

const ticketInit = (date, comment) => ({
  key: '-iekgjdjipp',
  accountKey: accountsArr[1].key,
  contactKey: contactsArr[1].key,
  userKey: usersArr[1].key,
  date,
  title: 'Customer Complaint',
  urgency: 'Medium',
  comment: {
    date,
    name: usersArr[1].name,
    body: 'We received a complaint'
  }
});

export {
  ticketsArr,
  tickets,
  comments,
  open_tickets,
  user_tickets,
  ticketInit
};
