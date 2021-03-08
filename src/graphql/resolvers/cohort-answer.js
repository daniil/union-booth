import { PubSub, withFilter, UserInputError } from 'apollo-server';
import { pipeResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import { validateAndReturnTopicIdOfCohortQuestion, validateTopicLive } from './validation';
import parseSequelizeError from 'utils/parseSequelizeError';

const pubsub = new PubSub();

export default {
  Query: {
    liveAnswers: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId }, { models }) => {
        const answers = models.CohortAnswer.findAll({
          where: {
            cohortQuestionId
          },
          order: [
            ['createdAt', 'ASC']
          ]
        });

        return answers;
      }
    )
  },

  Mutation: {
    addCohortAnswer: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId, answer }, { models, session }) => {
        try {
          const newAnswer = await models.CohortAnswer.create({
            userId: session.user.id,
            cohortQuestionId,
            answer
          });

          pubsub.publish('NEW_COHORT_ANSWER', { newCohortAnswer: newAnswer });

          return newAnswer;
        } catch(err) {
          console.log('ERR? ', err)
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  Subscription: {
    newCohortAnswer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['NEW_COHORT_ANSWER']),
        (payload, variables) => {
          return payload.newCohortAnswer.cohortQuestionId === variables.cohortQuestionId;
        }
      )
    }
  },

  CohortAnswer: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohortQuestion: async (parent, _, { loaders }) => {
      return await loaders.cohortQuestion.load(parent.cohortQuestionId);
    }
  }
}