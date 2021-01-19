import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Query: {
    cohorts: combineResolvers(
      isAuthenticated,
      async (_, { programId }, { models }) => {
        const cohorts = await models.Cohort.findAll({
          where: {
            programId
          }
        });
        return cohorts;
      }
    )
  },

  Mutation: {
    addCohort: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { programId, title }, { models, session }) => {
        try {
          const cohort = await models.Cohort.create({
            title,
            programId,
            userId: session.user.id
          });
  
          return cohort;
        } catch(err) {
          throw new UserInputError(err.message);
        }
      }
    )
  },

  Cohort: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    program: async(parent, _, { loaders }) => {
      return await loaders.program.load(parent.programId);
    }
  }
};