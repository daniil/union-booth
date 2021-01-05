import { AuthenticationError, UserInputError } from 'apollo-server';

const userSessionValues = user => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role
  };
}

export default {
  Query: {
    me: async (_, __, { models, session }) => {
      console.log('Session: ', session);
    }
  },

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

      session.user = userSessionValues(user);

      return user;
    },

    login: async (_, { login, password }, { models, session }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const passwordIsValid = await user.validatePassword(password);

      if (!passwordIsValid) {
        throw new AuthenticationError('Invalid password.');
      }

      session.user = userSessionValues(user);

      return user;
    }
  }
}