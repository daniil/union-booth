import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Query: {
    topicFAQAdmin: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
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