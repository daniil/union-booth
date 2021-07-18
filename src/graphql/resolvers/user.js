import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
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
    ),

    cohortUsers: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { cohortId }, { models, session }) => {
        const manager = await models.User.findOne({
          attributes: ['selectedProgram'],
          where: {
            id: session.user.id
          }
        });

        const cohort = await models.Cohort.findOne({
          attributes: ['id'],
          where: {
            id: cohortId,
            programId: manager.selectedProgram
          }
        });

        if (!cohort) {
          throw new UserInputError('You can not get users from cohort that is not part of your program.');
        }

        const users = await models.User.findAll({
          where: {
            cohortId,
            role: 'user'
          },
          order: [
            ['firstName', 'ASC'],
            ['lastName', 'ASC']
          ]
        });

        return users;
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

          user.password = password;

          const newPassword = await user.generatePasswordHash();

          await user.update({
            password: newPassword
          });

          return true;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  User: {
    cohort: async (parent, _, { loaders }) => {
      return await loaders.cohort.load(parent.cohortId);
    }
  }
}