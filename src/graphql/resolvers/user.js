import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';
import generateAvatar from 'utils/generateAvatar';

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
          attributes: ['id', 'firstName', 'lastName', 'username', 'email']
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
    },

    updateUserAvatar: combineResolvers(
      isAuthenticated,
      async (_, { userId }, { session }) => {
        console.log(session.user.id, userId)
        if (session.user.id !== userId) {
          throw new UserInputError('You can not generate a new avatar for a user other than yourself.');
        }

        try {
          generateAvatar(userId);
          return true;
        } catch(err) {
          throw new ApolloError('Could not generate a new avatar.');
        }
      }
    )
  }
}