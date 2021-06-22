import { withFilter, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import roleMap from 'utils/role-map';
import parseSequelizeError from 'utils/parseSequelizeError';
import pubsub from 'redis-pub-sub';

export default {
  Query: {
    liveQuestions: combineResolvers(
      isAuthenticated,
      async (_, { cohortId, topicId }, { models }) => {
        const questions = await models.CohortQuestion.findAll({
          where: {
            cohortId,
            topicId,
            isInactive: false
          },
          order: [
            ['createdAt', 'ASC']
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
    ),

    deactivateCohortQuestion: combineResolvers(
      isAuthenticated,
      async (_, { cohortQuestionId }, { models, session }) => {
        const isModerator = roleMap[session.user.role].includes('moderator');
        const question = await models.CohortQuestion.findOne({
          where: {
            id: cohortQuestionId,
            isInactive: false
          }
        });

        if (!question) {
          throw new UserInputError('Can not find this topic question');
        }

        if (!isModerator && question.userId !== session.user.id) {
          throw new UserInputError('You do not have permissions to delete this question');
        }

        await question.update({
          isInactive: true
        });

        pubsub.publish('COHORT_QUESTION_DEACTIVATED', { cohortQuestionDeactivated: question });

        return question;
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
    },
    cohortQuestionDeactivated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_QUESTION_DEACTIVATED']),
        (payload, variables) => {
          return payload.cohortQuestionDeactivated.cohortId === variables.cohortId &&
                 payload.cohortQuestionDeactivated.topicId === variables.topicId;
        }
      )
    }
  },

  CohortQuestion: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohort: async (parent, _, { loaders }) => {
      return await loaders.cohort.load(parent.cohortId);
    },
    topic: async (parent, _, { loaders }) => {
      return await loaders.topic.load(parent.topicId);
    },
    cohortAnswers: async (parent, _, { models }) => {
      return await models.CohortAnswer.findAll({
        where: {
          cohortQuestionId: parent.id
        },
        order: [
          ['createdAt', 'ASC']
        ]
      });
    }
  }
}