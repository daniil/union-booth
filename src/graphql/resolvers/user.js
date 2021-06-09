import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

const userSessionValues = user => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };
}

export default {
  Query: {
    user: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models }) => {
        const user = await models.User.findOne({
          where: { id },
          attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'role', 'createdAt', 'cohortId']
        });

        if (!user) {
          throw new UserInputError('No user found');
        }

        return user;
      }
    )
  },

  Mutation: {
    register: async (
      _,
      { firstName, lastName, username, email, password, isProgramOwner, cohortId },
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

        if (cohortId) {
          const cohort = await models.Cohort.findOne({
            attributes: ['id'],
            where: { id: cohortId }
          });

          if (!cohort) {
            throw new UserInputError('Invalid Cohort ID');
          }

          newUser.cohortId = cohortId;
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
        throw new UserInputError('No user found with this login credentials.');
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