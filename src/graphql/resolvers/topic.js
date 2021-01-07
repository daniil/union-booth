const { PubSub, withFilter } = require('apollo-server');
import { combineResolvers } from 'graphql-resolvers';

const pubsub = new PubSub();

export default {
  Query: {
    topics: async (_, __, { models }) => {
      const topics = await models.Topic.findAll();
      return topics;
    },
    live: async (_, __, { models }) => {
      const liveTopic = await models.Topic.findOne({
        where: {
          isActive: true
        }
      });
      return liveTopic;
    }
  },

  Mutation: {
    addTopic: async (_, args) => {
      pubsub.publish('TEST_MESSAGE', { testSub: args });
    }
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
  }
}