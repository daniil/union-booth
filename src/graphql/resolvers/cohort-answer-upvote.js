import { withFilter, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';
import pubsub from 'redis-pub-sub';

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
            attributes: ['cohortId'],
            where: {
              id: session.user.id
            }
          });

          const answer = await models.CohortAnswer.findOne({
            where: {
              id: cohortAnswerId,
              isInactive: false,
            },
            include: {
              model: models.CohortQuestion,
              attributes: ['cohortId']
            }
          });

          if (user.cohortId !== answer['cohort-question'].cohortId) {
            throw new UserInputError(`Can not ${isAdd ? 'add' : 'remove'} vote for the answer from different cohort`);
          }

          if (!answer) {
            throw new UserInputError('Can not upvote inactive answer');
          }

          if (isAdd) {
            await models.CohortAnswerUpvote.upsert({
              userId: session.user.id,
              cohortAnswerId
            });
          } else {
            await models.CohortAnswerUpvote.destroy({
              where: {
                userId: session.user.id,
                cohortAnswerId
              }
            });
          }

          pubsub.publish('COHORT_ANSWER_UPVOTE_UPDATED', {
            cohortAnswerUpvoteUpdated: {
              cohortAnswerId,
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
    cohortAnswerUpvoteUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_ANSWER_UPVOTE_UPDATED']), (payload, variables) => {
          return payload.cohortAnswerUpvoteUpdated.cohortAnswerId === variables.cohortAnswerId
        }
      )
    }
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