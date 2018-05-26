import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import { startAddTicket } from '../../actions/tickets';
import { ticketInit } from '../fixtures/tickets';

const store = configureMockStore([thunk])([]);

let ticket;
beforeEach(() => {
  store.clearActions();
  ticket = ticketInit(Date.now());
});

test('startAddTicket should save ticket to ref tickets/open', done => {
  store.dispatch(startAddTicket(ticket)).then(key => {
    db
      .ref(`tickets/open/${key}`)
      .once('value')
      .then(snapshot => {
        const ticketSnapshot = snapshot.val();
      });
  });
});
