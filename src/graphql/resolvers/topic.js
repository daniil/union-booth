const { PubSub, withFilter, UserInputError } = require('apollo-server');
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

const pubsub = new PubSub();

export default {
  Query: {
    topics: combineResolvers(
      isAuthenticated,
      async (_, __, { models }) => {
        const topics = await models.Topic.findAll();
        return topics;
      }
    ),

    topic: combineResolvers(
      isAuthenticated,
      async (_, { slug }, { models }) => {
        const topic = await models.Topic.findOne({
          where: {
            slug
          }
        });

        if (!topic) {
          throw new UserInputError(
            'This topic can not be found'
          );
        }

        return topic;
      }
    ),

    live: combineResolvers(
      isAuthenticated,
      async (_, __, { models }) => {
        const liveTopic = await models.Topic.findOne({
          where: {
            isActive: true
          }
        });
        return liveTopic;
      }
    )
  },

  Mutation: {
    addTopic: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { title }, { models, session }) => {
        const topic = await models.Topic.create({
          title,
          userId: session.user.id
        });

        pubsub.publish('TEST_MESSAGE', { testSub: title });

        return topic;
      }
    )
  },

  Subscription: {
    testSub: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('TEST_MESSAGE'),
        (payload, variables) => {
          console.log('Filter: ', payload, variables);
          return true;
        }
      )
    }
  },

  Topic: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
};