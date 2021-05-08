import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import { validateTopicSlug } from './validation';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
  Query: {
    resources: combineResolvers(
      isAuthenticated,
      validateTopicSlug,
      async (_, { slug }, { models }) => {
        const topic = await models.Topic.findOne({
          attributes: ['id'],
          where: { slug }
        });
         
        const resources = await models.Resource.findAll({
          where: {
            topicId: topic.id
          }
        });

        return resources;
      }
    )
  },

  Mutation: {
    addResource: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { id, topicId, url, title, description }, { models }) => {
        try {
          const resource = await models.Resource.upsert({
            id,
            topicId,
            url,
            title,
            description
          });

          const [resourceModel] = resource;

          return resourceModel;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  Resource: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.topicId);
    }
  }
};