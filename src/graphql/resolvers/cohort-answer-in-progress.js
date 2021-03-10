import { PubSub, withFilter, UserInputError } from 'apollo-server';
import { pipeResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import { validateAndReturnTopicIdOfCohortQuestion, validateTopicLive } from './validation';
import parseSequelizeError from 'utils/parseSequelizeError';

const pubsub = new PubSub();

export default {
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
          });

          const [answerProgressModel] = answerProgress;

          return answerProgressModel;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
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