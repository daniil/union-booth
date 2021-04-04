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

  TopicFAQAdmin: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.get('topicId'));
    }
  }
};