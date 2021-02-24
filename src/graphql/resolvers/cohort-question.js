import { PubSub, withFilter, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

const pubsub = new PubSub();

export default {
  Query: {
    liveQuestions: combineResolvers(
      isAuthenticated,
      async (_, { cohortId, topicId }, { models }) => {
        const questions = await models.CohortQuestion.findAll({
          where: {
            cohortId,
            topicId
          },
          order: [
            ['createdAt', 'DESC']
          ]
        });

        return questions; 
      }
    )
  },

  Mutation: {
    addCohortQuestion: combineResolvers(
      isAuthenticated,
      async (_, { topicId, question, isAnonymous }, { models, session }) => {
        const user = await models.User.findOne({
          attributes: ['cohortId'],
          where: {
            id: session.user.id
          }
        });

        const topic = await models.CohortTopic.findOne({
          where: {
            topicId,
            isLive: true
          }
        });

        if (!topic) {
          throw new UserInputError('This topic is not live. Can only add questions to live topics');
        }

        try {
          const newQuestion = await models.CohortQuestion.create({
            userId: session.user.id,
            cohortId: user.cohortId,
            topicId,
            question,
            isAnonymous
          });

          pubsub.publish('NEW_COHORT_QUESTION', { newCohortQuestion: newQuestion });

          return newQuestion;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  Subscription: {
    newCohortQuestion: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['NEW_COHORT_QUESTION']),
        (payload, variables) => {
          return payload.newCohortQuestion.cohortId === variables.cohortId &&
                 payload.newCohortQuestion.topicId === variables.topicId;
        }
      )
    }
  },

  CohortQuestion: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
}