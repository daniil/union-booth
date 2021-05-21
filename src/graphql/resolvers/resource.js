import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
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
    ),

    deactivateResource: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { id }, { models }) => {
        try {
          const resource = await models.Resource.findOne({
            where: {
              id,
              isInactive: false
            }
          });

          if (!resource) {
            throw new UserInputError('Resource can not be found or is already inactive');
          }

          await resource.update({
            isInactive: true
          });

          return resource;
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