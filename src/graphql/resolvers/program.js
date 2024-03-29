import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Query: {
    programs: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, __, { models, session }) => {
        const programs = await models.Program.findAll({
          where: {
            userId: session.user.id
          },
          order: [
            ['createdAt', 'DESC']
          ]
        });
        return programs;
      }
    ),

    selectedProgram: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, __, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['selectedProgram'],
          where: {
            id: session.user.id,
            isInactive: false
          }
        });

        if (!user) {
          throw new ForbiddenError('This user is inactive.');
        }

        if (!user.selectedProgram) return null;

        const program = await models.Program.findOne({
          where: {
            id: user.selectedProgram
          }
        });
        return program;
      }
    )
  },

  Mutation: {
    addProgram: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { title }, { models, session }) => {
        const program = await models.Program.create({
          title,
          userId: session.user.id
        });

        return program;
      }
    ),

    toggleProgramSelect: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { id, isSelected }, { models, session }) => {
        const program = await models.Program.findOne({
          where: {
            id
          }
        });

        if (program.userId !== session.user.id) {
          throw new AuthenticationError('You are not the owner of this program');
        }

        await models.User.update({
          selectedProgram: isSelected ? id : null,
          cohortId: null
        }, {
          where: {
            id: session.user.id
          }
        });

        return isSelected ? program : null;
      }
    )
  },

  Program: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
};