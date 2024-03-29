import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
  Mutation: {
    addTopicFAQQuestion: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { id, topicId, cohortQuestionId, question, answer }, { models }) => {
        try {
          if (cohortQuestionId) {
            const cohortQuestion = await models.CohortQuestion.findOne({
              where: {
                id: cohortQuestionId,
                topicId
              }
            });

            if (!cohortQuestion) {
              throw new UserInputError('This cohort question does not belong to this topic');
            }

            await cohortQuestion.update({
              convertedToFAQ: true
            });
          }

          const topicFAQQuestion = await models.TopicFAQ.upsert({
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
    ),

    deactivateTopicFAQQuestion: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { id }, { models }) => {
        try {
          const topicFAQQuestion = await models.TopicFAQ.findOne({
            where: {
              id,
              isInactive: false
            }
          });

          if (!topicFAQQuestion) {
            throw new UserInputError('FAQ Question can not be found or is already inactive');
          }

          await topicFAQQuestion.update({
            isInactive: true
          });

          return topicFAQQuestion;
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