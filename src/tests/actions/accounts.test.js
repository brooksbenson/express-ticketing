import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { startAddAccount } from '../../actions/accounts';

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  dispatch = jest.fn();
  db
    .ref('accounts')
    .set(null)
    .then(() => done());
});

test('should add account to db and store', done => {
  const account = { name: 'Flower Motors', website: 'www.flowerpower.com' };
  startAddAccount(account)(dispatch).then(key => {
    db
      .ref(`accounts/${key}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(account);
        expect(dispatch).to;
      });
  });
});
