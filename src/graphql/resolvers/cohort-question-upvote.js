import { withFilter, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';
import pubsub from 'redis-pub-sub';

export default {
  Query: {
    cohortQuestionUpvotes: combineResolvers(
      isAuthenticated,
      async (_, { cohortQuestionId }, { models }) => {
        const questionUpvotes = await models.CohortQuestionUpvote.findAll({
          where: {
            cohortQuestionId
          }
        });

        return questionUpvotes;
      }
    )
  },

  Mutation: {
    toggleCohortQuestionUpvote: combineResolvers(
      isAuthenticated,
      async (_, { cohortQuestionId, isAdd }, { models, session }) => {
        try {
          const user = await models.User.findOne({
            where: {
              id: session.user.id
            }
          });
  
          const question = await models.CohortQuestion.findOne({
            where: {
              id: cohortQuestionId
            }
          });
  
          if (user.cohortId !== question.cohortId) {
            throw new UserInputError(`Can not ${isAdd ? 'add' : 'remove'} vote for the question from different cohort`);
          }
  
          if (isAdd) {
            await models.CohortQuestionUpvote.upsert({
              userId: session.user.id,
              cohortQuestionId
            });
          } else {
            await models.CohortQuestionUpvote.destroy({
              where: {
                userId: session.user.id,
                cohortQuestionId
              }
            });
          }

          pubsub.publish('COHORT_QUESTION_UPVOTE_UPDATED', {
            cohortQuestionUpvoteUpdated: {
              cohortQuestionId,
              userId: session.user.id,
              isAdd
            }
          });

          return true;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  Subscription: {
    cohortQuestionUpvoteUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_QUESTION_UPVOTE_UPDATED']),
        (payload, variables) => {
          return payload.cohortQuestionUpvoteUpdated.cohortQuestionId === variables.cohortQuestionId;
        }
      )
    }
  },

  CohortQuestionUpvote: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohortQuestion: async (parent, _, { loaders }) => {
      return await loaders.cohortQuestion.load(parent.cohortQuestionId);
    }
  }
}