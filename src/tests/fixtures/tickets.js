import { usersArr, usersObj } from '../fixtures/users';
import { accountsArr, accountsObj } from '../fixtures/accounts';
import { contactsArr, contactsObj } from '../fixtures/contacts';

const accountKeys = Object.keys(accountsObj);
const contactKeys = Object.keys(contactsObj);
const userKeys = Object.keys(usersObj);

const ticketsArr = [
  {
    key: '-9999',
    status: 'open',
    accountKey: accountKeys[0],
    contactKey: contactKeys[0],
    userKeys: [userKeys[0]],
    date: Date.now(),
    title: 'Shipping Delay',
    urgency: 'Low'
  },
  {
    key: '-8989',
    status: 'open',
    accountKey: accountKeys[1],
    contactKey: contactKeys[1],
    userKeys: [userKeys[1]],
    date: Date.now(),
    title: 'Customer Complaint',
    urgency: 'Low'
  },
  {
    key: '-1234',
    status: 'open',
    accountKey: accountKeys[2],
    contactKey: contactKeys[2],
    userKeys: [userKeys[1], userKeys[2]],
    date: Date.now(),
    title: 'Roof Leak',
    urgency: 'Low'
  },
  {
    key: '-3333',
    status: 'closed',
    accountKey: accountKeys[2],
    contactKey: contactKeys[2],
    userKeys: [userKeys[0], userKeys[2]],
    date: Date.now(),
    title: 'Bounced Check',
    urgency: 'High'
  }
];

const ticketsObj = {};
const userTickets = {};
userKeys.forEach(uKey => {
  userTickets[uKey] = {};
});
const openTickets = {};
const closedTickets = {};

ticketsArr.forEach(({ key, status, userKeys, ...ticket }) => {
  ticketsObj[key] = { ...ticket, status, userKeys: {} };
  userKeys.forEach(uKey => {
    ticketsObj[key].userKeys[uKey] = true;
    userTickets[uKey][key] = true;
  });
  switch (status) {
    case 'open':
      openTickets[key] = true;
      break;
    case 'closed':
      closedTickets[key] = true;
      break;
  }
});

const ticketInit = () => ({
  title: 'Customer Complaint',
  urgency: 'Low'
});

const ticketKeys = Object.keys(ticketsObj);

export {
  ticketKeys,
  ticketsArr,
  ticketsObj,
  userTickets,
  openTickets,
  closedTickets,
  ticketInit
};
