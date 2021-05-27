import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole} from './auth';
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

  Mutation: {
    updateResourcesOrder: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { topicSlug, orderList }, { models }) => {
        try {
          const resourceUpdates = orderList.map(orderItem => {
            return models.Resource.update({
              order: orderItem.order
            }, {
              where: {
                id: orderItem.id
              }
            })
          })
          
          await Promise.all(resourceUpdates);

          const topic = models.Topic.findOne(({
            attributes: [['id', 'topicId']],
            where: { slug: topicSlug }
          }));

          return topic;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
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
        },
        order: [
          ['order', 'ASC']
        ]
      });
    }
  }
};