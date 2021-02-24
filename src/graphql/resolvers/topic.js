import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
  Query: {
    topics: combineResolvers(
      isAuthenticated,
      checkRole('admin'),
      async (_, { programId }, { models }) => {
        const topics = await models.Topic.findAll({
          where: { programId },
          order: [
            ['createdAt', 'DESC']
          ]
        });
        return topics;
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