import { UserInputError, ForbiddenError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, checkRole } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
  Query: {
    cohorts: combineResolvers(
      isAuthenticated,
      async (_, { programId }, { models }) => {
        const cohorts = await models.Cohort.findAll({
          where: { programId },
          order: [
            ['createdAt', 'DESC']
          ]
        });
        return cohorts;
      }
    ),

    selectedCohort: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, __, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['cohortId'],
          where: {
            id: session.user.id,
            isInactive: false
          }
        });

        if (!user) {
          throw new ForbiddenError('This user is inactive.');
        }

        if (!user.cohortId) return null;

        const cohort = await models.Cohort.findOne({
          where: {
            id: user.cohortId
          }
        });
        return cohort;
      }
    )
  },

  Mutation: {
    addCohort: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { programId, title }, { models, session }) => {
        try {
          const cohort = await models.Cohort.create({
            title,
            programId,
            userId: session.user.id
          });

          const topics = await models.Topic.findAll({
            attributes: ['id'],
            where: { programId }
          });

          await models.CohortTopic.bulkCreate(topics.map(topic => {
            return {
              cohortId: cohort.id,
              topicId: topic.id
            };
          }));
  
          return cohort;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    ),

    toggleCohortSelect: combineResolvers(
      isAuthenticated,
      checkRole('manager'),
      async (_, { id, isSelected }, { models, session }) => {
        const cohort = await models.Cohort.findOne({
          where: {
            id
          }
        });

        await models.User.update({
          cohortId: isSelected ? id : null
        }, {
          where: {
            id: session.user.id
          }
        });

        return isSelected ? cohort : null;
      }
    )
  },

  Cohort: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    program: async(parent, _, { loaders }) => {
      return await loaders.program.load(parent.programId);
    }
  }
};