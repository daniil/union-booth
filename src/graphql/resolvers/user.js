import { AuthenticationError, UserInputError, ApolloError, ForbiddenError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { Op } from 'sequelize';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';
import generateAvatar from 'utils/generateAvatar';
import { validateManagerCohort } from './validation';

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
          where: {
            id,
            isInactive: false
          },
          attributes: ['id', 'firstName', 'lastName', 'username', 'email']
        });

        if (!user) {
          throw new UserInputError('No user found or user is inactive');
        }

        return user;
      }
    ),

    cohortUsers: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      validateManagerCohort,
      async (_, { cohortId }, { models }) => {
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
    ),

    cohortTeamUsers: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      validateManagerCohort,
      async (_, { cohortId }, { models }) => {
        const users = await models.User.findAll({
          where: {
            cohortId,
            role: 'moderator'
          },
          order: [
            ['firstName', 'ASC'],
            ['lastName', 'ASC']
          ]
        });

        return users;
      }
    ),

    programUsers: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, __, { models, session }) => {
        const user = await models.User.findOne({
          where: {
            id: session.user.id,
            isInactive: false
          }
        });

        if (!user) {
          throw new ForbiddenError('This user is inactive.');
        }

        if (user) {
          const users = await models.User.findAll({
            where: {
              selectedProgram: user.selectedProgram,
              role: {
                [Op.in]: ['admin', 'manager']
              },
              id: {
                [Op.ne]: user.id
              }
            },
            order: [
              ['firstName', 'ASC'],
              ['lastName', 'ASC']
            ]
          });

          return users;
        }
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
        throw new UserInputError('No active user found with this login credentials.');
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
              id: userId,
              isInactive: false
            }
          });

          if (!user) {
            throw new UserInputError('User can not be found or is inactive');
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
              id: userId,
              isInactive: false
            }
          });

          if (!user) {
            throw new UserInputError('User can not be found or is inactive');
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
    ),

    deactivateUser: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { id }, { models, session }) => {
        try {
          const manager = await models.User.findOne({
            attributes: ['id', 'role', 'selectedProgram'],
            where: {
              id: session.user.id
            }
          });

          const user = await models.User.findOne({
            where: {
              id
            },
            include: [{
              model: models.Cohort,
              attributes: ['programId'],
              as: 'cohort'
            }]
          });

          if (user.isInactive) {
            throw new UserInputError('This user is already inactive');
          }

          if (manager.id === user.id) {
            throw new UserInputError('You can not deactivate your own account');
          }

          if (manager.role === 'manager' && ['admin', 'manager'].includes(user.role)) {
            throw new UserInputError('You do not have permissions to deactivate manager or admin account');
          }

          if (!user.cohort) {
            throw new UserInputError('This user does not seem to be a part of existing cohort');
          }

          if (manager.selectedProgram !== user.cohort.programId) {
            throw new UserInputError('You do not have permissions to deactivate user from this program');
          }

          return user;
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