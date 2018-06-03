const accountsArr = [
  {
    key: 'jfkda;',
    name: 'Flower Motors',
    website: 'www.flowerpower.com'
  },
  {
    key: 'kfjdka',
    name: 'Prophecy Systems',
    website: 'www.prophetic.io'
  },
  {
    key: 'fjdkal',
    name: 'Dynamic Foods',
    website: 'www.fooddynamics.com'
  }
];

const accountsObj = {};
accountsArr.forEach(({ key, ...a }) => {
  accountsObj[key] = a;
});

export { accountsArr, accountsObj };
