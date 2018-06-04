import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  addUser,
  startAddUser,
  setUsers,
  startSetUsers
} from '../../actions/users';
import { usersArr, usersObj } from '../fixtures/users';

const store = configureMockStore([thunk])({});

beforeEach(done => {
  store.clearActions();
  db
    .ref('user_data')
    .set(usersObj)
    .then(() => done());
});

test('addUser should setup action correctly', () => {
  const { key } = usersArr[0];
  const user = usersObj[key];
  const action = addUser({ key, ...user });
  expect(action).toEqual({
    type: 'ADD_USER',
    key,
    user
  });
});

test('startAddUser should add user to db and store', done => {
  const user = { name: 'Jeremy Street', email: 'jeremy@mail.com', admin: true };
  store.dispatch(startAddUser(user)).then(key => {
    db
      .ref(`user_data/${key}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(user);
        const [action] = store.getActions();
        expect(action).toEqual({
          type: 'ADD_USER',
          key,
          user
        });
        done();
      });
  });
});

test('setUsers should setup action correctly', () => {
  const action = setUsers(users);
  expect(action).toEqual({
    type: 'SET_USERS',
    users
  });
});

test('startSetUsers should fetch and set users from db', done => {
  db
    .ref('usersPublic')
    .set(users)
    .then(() => {
      store.dispatch(startSetUsers()).then(() => {
        const [action] = store.getActions();
        const { type, users: usersFromDb } = action;
        expect(type).toBe('SET_USERS');
        expect(usersFromDb.length).toBe(users.length);
        usersFromDb.forEach(user => {
          expect(user.key).toBeTruthy();
        });
        done();
      });
    });
});
