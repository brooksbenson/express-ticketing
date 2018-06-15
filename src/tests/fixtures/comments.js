import { ticketsArr } from './tickets';
import { usersObj } from './users';

const userKeys = Object.keys(usersObj);

const commentsArr = [
  {
    key: '12233',
    date: 0,
    text: 'Wow. This is crazy.'
  },
  {
    key: '14283',
    date: 0,
    text: 'Wow. This is nuts.'
  },
  {
    key: '24233',
    date: 0,
    text: 'Wow. This is insane.'
  }
];

const comments = {};
ticketsArr.forEach(({ key: ticketKey, userKeys }) => {
  comments[ticketKey] = {};
  commentsArr.forEach(({ key: commentKey, ...c }) => {
    comments[ticketKey][commentKey] = { userKey: userKeys[0], ...c };
  });
});

export { comments };
