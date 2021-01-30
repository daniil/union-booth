const { PubSub, withFilter, UserInputError } = require('apollo-server');
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

const pubsub = new PubSub();

export default {
  Query: {
    topics: combineResolvers(
      isAuthenticated,
      async (_, { programId }, { models }) => {
        const topics = await models.Topic.findAll({
          where: { programId }
        });
        return topics;
      }
    ),

    topic: combineResolvers(
      isAuthenticated,
      async (_, { slug }, { models }) => {
        const topic = await models.Topic.findOne({
          where: { slug }
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
        // TODO: Refactor this query to user CohortTopics table
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
      async (_, { programId, title }, { models, session }) => {
        try {
          const topic = await models.Topic.create({
            title,
            programId,
            userId: session.user.id
          });

          const cohorts = await models.Cohort.findAll({
            attributes: ['id'],
            where: { programId }
          });

          await models.CohortTopic.bulkCreate(cohorts.map(cohort => {
            return {
              cohortId: cohort.id,
              topicId: topic.id
            };
          }));

          pubsub.publish('TEST_MESSAGE', { testSub: title });

          return topic;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
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
    },
    program: async(parent, _, { loaders }) => {
      return await loaders.program.load(parent.programId);
    }
  }
};