import { AuthenticationError, UserInputError } from 'apollo-server';
import parseSequelizeError from '../../utils/parseSequelizeError';

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
      { firstName, lastName, username, email, password, isProgramOwner },
      { models, session }
    ) => {
      try {
        const newUser = {
          firstName,
          lastName,
          username,
          email,
          password
        };

        if (isProgramOwner) {
          newUser.role = 'admin';
        }

        const user = await models.User.create(newUser);
        session.user = userSessionValues(user);
        return user;
      } catch(err) {
        throw new UserInputError(parseSequelizeError(err));
      }
    },

    login: async (_, { login, password }, { models, session }) => {
      const user = await models.User.findByLogin(login);
      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.'
        );
      }

      const passwordIsValid = await user.validatePassword(password);
      if (!passwordIsValid) {
        throw new AuthenticationError('Invalid password.');
      }

      session.user = userSessionValues(user);
      return user;
    },

    logout: async (_, __, { session }) => {
      session.user = null;
      return true;
    }
  }
}