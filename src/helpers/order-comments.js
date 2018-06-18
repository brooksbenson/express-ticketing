export default (comments, users) => {
  const commentsArr = Object.keys(comments).map(key => {
    const { userKey, ...rest } = comments[key];
    return { key, ...rest, name: users[userKey].name };
  });
  return commentsArr.sort((a, b) => (a.date > b.date ? -1 : 1));
};
