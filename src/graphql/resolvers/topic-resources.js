import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import { validateTopicSlug } from './validation';

export default {
  Query: {
    topicResources: combineResolvers(
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

  TopicResources: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.get('topicId'));
    },
    resources: async (parent, _, { models }) => {
      return await models.Resource.findAll({
        where: {
          topicId: parent.get('topicId'),
          isInactive: false
        }
      });
    }
  }
};