import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Query: {
    programs: combineResolvers(
      isAuthenticated,
      async (_, __, { models, session }) => {
        const programs = await models.Program.findAll({
          where: {
            userId: session.user.id
          }
        });
        return programs;
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

        await models.Program.update({ isSelected: false }, {
          where: {
            userId: session.user.id
          }
        });

        await program.update({ isSelected });

        return program;
      }
    )
  },

  Program: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
};