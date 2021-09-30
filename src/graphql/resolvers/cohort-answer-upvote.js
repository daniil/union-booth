import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

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

  Mutation: {
    toggleCohortAnswerUpvote: combineResolvers(
      isAuthenticated,
      async (_, { cohortAnswerId, isAdd }, { models, session }) => {
        try {
          const user = await models.User.findOne({
            where: {
              id: session.user.id
            }
          });

          
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
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