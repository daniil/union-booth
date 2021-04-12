import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Mutation: {
    addTopicFAQQuestion: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { id, topicId, cohortQuestionId, question, answer }, { models }) => {
        try {
          const topicFAQQuestion = await models.FAQ.upsert({
            id,
            topicId,
            cohortQuestionId,
            question,
            answer
          });

          const [topicFAQQuestionModel] = topicFAQQuestion;

          return topicFAQQuestionModel;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  TopicFAQQuestion: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.topicId);
    },
    cohortQuestion: async (parent, _, { loaders }) => {
      if (!parent.cohortQuestionId) return null;
      return await loaders.cohortQuestion.load(parent.cohortQuestionId);
    }
  }
};