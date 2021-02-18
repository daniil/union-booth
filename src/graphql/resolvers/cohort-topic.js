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
    ),

    unlockedTopics: combineResolvers(
      isAuthenticated,
      async (_, __, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['cohortId'],
          where: {
            id: session.user.id
          }
        });

        const unlockedTopics = await models.CohortTopic.findAll({
          where: {
            cohortId: user.cohortId,
            isUnlocked: true
          },
          include: {
            model: models.Topic,
            attributes: ['createdAt']
          },
          order: [
            [models.CohortTopic.associations.topic, 'createdAt', 'DESC']
          ]
        });
        
        return unlockedTopics;
      }
    ),

    topic: combineResolvers(
      isAuthenticated,
      async (_, { slug }, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['cohortId'],
          where: {
            id: session.user.id
          }
        });

        const topic = await models.CohortTopic.findOne({
          where: {
            cohortId: user.cohortId,
            isUnlocked: true,
            '$topic.slug$': slug
          },
          include: [{
            model: models.Topic,
            attributes: ['slug'],
            as: 'topic'
          }]
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
      async (_, __, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['cohortId'],
          where: {
            id: session.user.id
          }
        });

        const topic = await models.CohortTopic.findOne({
          where: {
            cohortId: user.cohortId,
            isLive: true
          }
        });

        return topic;
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
    ),

    toggleCohortTopicLive: combineResolvers(
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

        if (status) {
          if (!cohortTopic.isUnlocked) {
            throw new UserInputError('Cohort Topic is not unlocked');
          }
          await models.CohortTopic.update({
            isLive: false
          }, {
            where: { cohortId }
          });
        }

        await cohortTopic.update({
          isLive: status
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