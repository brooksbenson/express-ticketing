export const setUser = (users, email) => ({
  type: 'SET_USER',
  user: users.find(u => u.email == email)
});
