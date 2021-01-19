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
          },
          include: models.Topic
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
    )
  },

  Program: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
};