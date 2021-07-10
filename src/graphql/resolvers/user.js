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
      { firstName, lastName, username, email, password, isProgramOwner, cohortId, programId },
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

        if (programId) {
          const program = await models.Program.findOne({
            attributes: ['id'],
            where: { id: programId }
          });

          if (!program) {
            throw new UserInputError('Invalid Program ID');
          }

          newUser.role = 'manager';
          newUser.selectedProgram = programId;
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
    ),

    updateUserInfo: combineResolvers(
      isAuthenticated,
      async (_, { userId, firstName, lastName, username, email }, { models, session }) => {
        if (session.user.id !== userId) {
          throw new UserInputError('You can not update information for a user other than yourself.');
        }
        
        try {
          const user = await models.User.findOne({
            where: {
              id: userId
            }
          });

          if (!user) {
            throw new UserInputError('User can not be found');
          }

          await user.update({
            firstName,
            lastName,
            username,
            email
          });

          session.user = userSessionValues(user);
          return user;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    ),

    updateUserPassword: combineResolvers(
      isAuthenticated,
      async (_, { userId, password }, { models, session }) => {
        if (session.user.id !== userId) {
          throw new UserInputError('You can not update password for a user other than yourself.');
        }

        try {
          const user = await models.User.findOne({
            where: {
              id: userId
            }
          });

          if (!user) {
            throw new UserInputError('User can not be found');
          }

          await user.update({
            password
          });

          return true;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  }
}