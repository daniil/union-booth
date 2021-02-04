import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

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

  Mutation: {
    toggleCohortTopicStatus: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { cohortId, topicId, statusType, status }, { models }) => {
        if (!['isUnlocked', 'isLive'].includes(statusType)) {
          throw new UserInputError('Unknown status type');
        }

        const cohortTopic = await models.CohortTopic.findOne({
          where: {
            cohortId,
            topicId
          }
        });

        if (!cohortTopic) {
          throw new UserInputError('Cohort Topic not found');
        }

        await cohortTopic.update({
          [statusType]: status
        });

        return cohortTopic;
      }
    )
  },

  CohortTopic: {
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.topicId);
    }
  }
};