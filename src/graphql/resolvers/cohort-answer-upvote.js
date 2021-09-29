import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';

export default {
  Query: {
    cohortAnswerUpvotes: combineResolvers(
      isAuthenticated,
      async (_, { cohortAnswerId }, { models }) => {
        const answerUpvotes = await models.CohortAnswerUpvote.findAll({
          where: {
            cohortAnswerId
          }
        });

        return answerUpvotes;
      }
    )
  },

  CohortAnswerUpvote: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohortAnswer: async (parent, _, { loaders }) => {
      return await loaders.cohortAnswer.load(parent.cohortAnswerId);
    }
  }
}