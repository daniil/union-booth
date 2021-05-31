import { withFilter, UserInputError } from 'apollo-server';
import { pipeResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import { validateAndReturnTopicIdOfCohortQuestion, validateTopicLive } from './validation';
import parseSequelizeError from 'utils/parseSequelizeError';
import pubsub from 'redis-pub-sub';

export default {
  Query: {
    answersInProgress: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId }, { models }) => {
        const answersInProgress = models.CohortAnswerInProgress.findAll({
          where: {
            cohortQuestionId
          },
          order: [
            ['createdAt', 'ASC']
          ]
        });

        return answersInProgress;
      }
    )
  },

  Mutation: {
    updateCohortAnswerProgress: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId, status }, { models, session }) => {
        try {
          const answerProgress = await models.CohortAnswerInProgress.upsert({
            cohortQuestionId,
            userId: session.user.id,
            isActive: status
          }, {
            where: {
              cohortQuestionId,
              userId: session.user.id
            }
          });

          const [answerProgressModel] = answerProgress;

          pubsub.publish('COHORT_ANSWER_PROGRESS', { cohortAnswerProgress: answerProgressModel });

          return answerProgressModel;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  Subscription: {
    cohortAnswerProgress: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_ANSWER_PROGRESS']),
        (payload, variables) => {
          return payload.cohortAnswerProgress.cohortQuestionId === variables.cohortQuestionId;
        }
      )
    }
  },

  CohortAnswerInProgress: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohortQuestion: async (parent, _, { loaders }) => {
      return await loaders.cohortQuestion.load(parent.cohortQuestionId);
    }
  }
}