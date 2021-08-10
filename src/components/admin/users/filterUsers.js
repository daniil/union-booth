const filterUsers = (users, filter) => {
  return users.filter(user => {
    if (filter === 'active') return !user.isInactive;
    if (filter === 'inactive') return user.isInactive;
    return user;
  });
}

export default filterUsers;