import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import { validateTopicSlug } from './validation';

export default {
  Query: {
    topicFAQ: combineResolvers(
      isAuthenticated,
      validateTopicSlug,
      async (_, { slug }, { models }) => {
        const topic = await models.Topic.findOne({
          attributes: [['id', 'topicId']],
          where: { slug }
        });
        return topic;
      }
    )
  },

  TopicFAQ: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.get('topicId'));
    },
    topicFAQQuestions: async (parent, _, { models }) => {
      return await models.TopicFAQ.findAll({
        where: {
          topicId: parent.get('topicId'),
          isInactive: false
        },
        order: [
          ['createdAt', 'ASC']
        ]
      })
    },
    cohortQuestions: async (parent, _, { models }) => {
      return await models.CohortQuestion.findAll({
        where: {
          topicId: parent.get('topicId')
        },
        order: [
          ['createdAt', 'ASC']
        ]
      });
    }
  }
};