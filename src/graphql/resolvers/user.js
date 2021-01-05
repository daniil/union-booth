export default {
  Mutation: {
    register: async (
      _,
      { firstName, lastName, username, email, password, role },
      { models, session }
    ) => {
      const user = await models.User.create({
        firstName,
        lastName,
        username,
        email,
        password
      });

      session.user = {
        id: user.id,
        email,
        username,
        role: role || user.role
      };

      return user;
    }
  }
}