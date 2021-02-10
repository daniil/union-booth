import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';

export default {
  Query: {
    cohortTopics: combineResolvers(
      isAuthenticated,
      async (_, { cohortId }, { models }) => {
        const cohortTopics = await models.CohortTopic.findAll({
          where: { cohortId },
          include: {
            model: models.Topic,
            attributes: ['createdAt']
          },
          order: [
            [models.CohortTopic.associations.topic, 'createdAt', 'DESC']
          ]
        });
        return cohortTopics;
      }
    )
  },

  Mutation: {
    toggleCohortTopicUnlocked: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { cohortId, topicId, status }, { models }) => {
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
          isUnlocked: status,
          isLive: status ? cohortTopic.isLive : false
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