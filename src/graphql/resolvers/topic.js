const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

export default {
  Query: {
    topics: async(_, __, { models }) => {
      const topics = await models.Topic.findAll();
      return topics;
    }
  },

  Mutation: {
    addTopic: async (_, args, { }) => {
      pubsub.publish('TEST_MESSAGE', { testSub: args });
    }
  },

  Subscription: {
    testSub: {
      subscribe: () => pubsub.asyncIterator('TEST_MESSAGE')
    }
  }
}