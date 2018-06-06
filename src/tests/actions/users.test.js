import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import {
  addUser,
  startAddUser,
  setUsers,
  startSetUsers
} from '../../actions/users';
import dbModel from '../fixtures/db-model';
import storeModel from '../fixtures/store-model';
import { usersArr, usersObj } from '../fixtures/users';

const store = configureMockStore([thunk])(storeModel);

beforeEach(async done => {
  store.clearActions();
  await db.ref().set(dbModel);
  done();
});

test('addUser should setup action correctly', () => {
  const { key, ...user } = usersArr[0];
  const action = addUser({ key, ...user });
  expect(action).toEqual({
    type: 'ADD_USER',
    key,
    user
  });
});

test('startAddUser should add user to db and store', async done => {
  const user = { name: 'Jeremy Street', email: 'jeremy@mail.com', admin: true };
  const key = await store.dispatch(startAddUser(user));
  const [action] = store.getActions();
  const snap = await db.ref(`user_data/${key}`).once('value');
  expect(snap.val()).toEqual(user);
  expect(action).toEqual({ type: 'ADD_USER', key, user });
  done();
});

test('setUsers should setup action correctly', () => {
  const action = setUsers(usersObj);
  expect(action).toEqual({
    type: 'SET_USERS',
    users: usersObj
  });
});

test('startSetUsers should fetch users from db and dispatch action', async done => {
  await store.dispatch(startSetUsers());
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'SET_USERS',
    users: usersObj
  });
  done();
});
