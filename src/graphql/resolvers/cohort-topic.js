import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';

export default {
  Query: {
    cohortTopics: combineResolvers(
      isAuthenticated,
      async (_, { cohortId }, { models }) => {
        const cohortTopics = await models.CohortTopic.findAll({
          where: { cohortId }
        });
        return cohortTopics;
      }
    )
  },

  CohortTopic: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.topicId);
    }
  }
};