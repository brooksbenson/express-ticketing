export default ticket => ({
  meta: {
    date: ticket.date,
    accountName: ticket.account.name,
    contactName: ticket.contact.name,
    urgency: ticket.urgency,
    title: ticket.title
  },
  dense: {
    date: ticket.date,
    account: ticket.account,
    contact: ticket.contact,
    urgency: ticket.urgency,
    title: ticket.title,
    comments: null,
    users: null
  },
  comment: ticket.comment,
  user: ticket.user
});
