import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';
import session from 'express-session';

export default {
  Query: {
    topics: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { programId }, { models }) => {
        const topics = await models.Topic.findAll({
          where: { programId },
          order: [
            ['createdAt', 'DESC']
          ]
        });
        return topics;
      }
    ),

    adminTopic: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { slug }, { models }) => {
        const topic = await models.Topic.findOne({
          where: {
            slug
          }
        });

        if (!topic) {
          throw new UserInputError('This topic can not be found');
        }

        const user = await models.User.findOne({
          attributes: ['selectedProgram'],
          where: {
            id: session.user.id,
            selectedProgram: topic.programId
          }
        });

        if (!user) {
          throw new UserInputError('This user has no access to this topic');
        }

        return topic;
      }
    )
  },

  Mutation: {
    addTopic: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
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

          return topic;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    ),

    addTopicCheatsheet: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { topicId, details }, { models }) => {
        try {
          const topic = await models.Topic.findOne({
            where: {
              id: topicId
            }
          });

          await topic.update({
            cheatsheet: details
          });

          return topic;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
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