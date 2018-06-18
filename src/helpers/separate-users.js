export default (users, ticketUsers) => {
  const attachedUsers = [];
  const nonAttachedUsers = [];
  users.forEach(u => {
    if (u.key in ticketUsers) {
      attachedUsers.push(u);
    } else {
      nonAttachedUsers.push(u);
    }
  });
  return { attachedUsers, nonAttachedUsers };
};
