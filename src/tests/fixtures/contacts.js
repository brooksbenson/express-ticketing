const contactsArr = [
  {
    key: '-jKDji485',
    name: 'Jerry Fisher',
    number: '8015678989',
    email: 'jerry@mail.com'
  },
  {
    key: '-jKDji485',
    name: 'Warren Buffguy',
    number: '3587658900',
    email: 'warren@mail.com'
  },
  {
    key: '-jKDji485',
    name: 'Wendy Robinson',
    number: '3587112441',
    email: 'wendy@mail.com'
  }
];

const contactsObj = {};
contactsArr.forEach(({ key, ...c }) => {
  contactsObj[key] = c;
});

export { contactsArr, contactsObj };
