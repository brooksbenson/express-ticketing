import { accountsObj } from './accounts';

const accountKeys = Object.keys(accountsObj);
const contactsArr = [
  {
    key: '-jKD888ji485',
    name: 'Jerry Fisher',
    number: '8015678989',
    email: 'jerry@mail.com'
  },
  {
    key: '-jKD485',
    name: 'Warren Buffguy',
    number: '3587658900',
    email: 'warren@mail.com'
  },
  {
    key: '-jKDji4jf5',
    name: 'Wendy Robinson',
    number: '3587112441',
    email: 'wendy@mail.com'
  }
];

const contactsObj = {};

accountKeys.forEach(aKey => {
  contactsObj[aKey] = {};
  contactsArr.forEach(({ key: cKey, ...c }) => {
    contactsObj[aKey][cKey] = c;
  });
});

export { contactsArr, contactsObj };
