const usersArr = [
  {
    key: 'kdlejf',
    name: 'Max Benson',
    email: 'max@mail.com',
    admin: false
  },
  {
    key: '-keiajf',
    name: 'Brooks Benson',
    email: 'brooks@mail.com',
    admin: true
  },
  {
    key: '-wqqadv',
    name: 'Jeff Benson',
    email: 'jeff@mail.com',
    admin: false
  }
];

const usersObj = {};
usersArr.forEach(({ key, ...info }) => {
  usersObj[key] = info;
});

export { usersArr, usersObj };
