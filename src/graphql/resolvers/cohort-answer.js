import { withFilter, UserInputError } from 'apollo-server';
import { combineResolvers, pipeResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import roleMap from 'utils/role-map';
import { validateAndReturnTopicIdOfCohortQuestion, validateTopicLive } from './validation';
import parseSequelizeError from 'utils/parseSequelizeError';
import pubsub from 'redis-pub-sub';

export default {
  Query: {
    liveAnswers: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId }, { models }) => {
        const answers = models.CohortAnswer.findAll({
          where: {
            cohortQuestionId,
            isInactive: false
          },
          order: [
            ['createdAt', 'ASC']
          ]
        });

        return answers;
      }
    )
  },

  Mutation: {
    addCohortAnswer: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { answerId, cohortQuestionId, answer }, { models, session }) => {
        try {
          const question = await models.CohortQuestion.findOne({
            attributes: ['topicId'],
            where: {
              id: cohortQuestionId,
              isInactive: false
            }
          });

          if (!question) {
            throw new UserInputError('This question is inactive. Can only add answers to active questions');
          }

          const user = await models.User.findOne({
            attributes: ['cohortId'],
            where: {
              id: session.user.id,
              isInactive: false
            }
          });

          if (!user) {
            throw new UserInputError('This user is inactive. Only active users can add answers');
          }
  
          const topic = await models.CohortTopic.findOne({
            where: {
              topicId: question.topicId,
              cohortId: user.cohortId,
              isLive: true
            }
          });
  
          if (!topic) {
            throw new UserInputError('This topic is not live. Can only add questions to live topics');
          }

          const newAnswer = await models.CohortAnswer.upsert({
            id: answerId,
            userId: session.user.id,
            cohortQuestionId,
            answer
          });

          const [newAnswerModel] = newAnswer;

          if (answerId) {
            pubsub.publish('COHORT_ANSWER_UPDATED', { cohortAnswerUpdated: newAnswerModel })
          } else {
            pubsub.publish('NEW_COHORT_ANSWER', { newCohortAnswer: newAnswerModel });
          }

          return newAnswerModel;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    ),

    deactivateCohortAnswer: combineResolvers(
      isAuthenticated,
      async (_, { cohortAnswerId }, { models, session }) => {
        const isModerator = roleMap[session.user.role].includes('moderator');
        const answer = await models.CohortAnswer.findOne({
          where: {
            id: cohortAnswerId,
            isInactive: false
          }
        });

        if (!answer) {
          throw new UserInputError('Can not find this topic answer');
        }

        if (!isModerator && answer.userId !== session.user.id) {
          throw new UserInputError('You do not have permissions to delete this answer');
        }

        await answer.update({
          isInactive: true
        });

        pubsub.publish('COHORT_ANSWER_DEACTIVATED', { cohortAnswerDeactivated: answer });

        return answer;
      }
    )
  },

  Subscription: {
    newCohortAnswer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['NEW_COHORT_ANSWER']),
        (payload, variables) => {
          return payload.newCohortAnswer.cohortQuestionId === variables.cohortQuestionId;
        }
      )
    },
    cohortAnswerUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_ANSWER_UPDATED']),
        (payload, variables) => {
          return payload.cohortAnswerUpdated.cohortQuestionId === variables.cohortQuestionId
        }
      )
    },
    cohortAnswerDeactivated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['COHORT_ANSWER_DEACTIVATED']),
        (payload, variables) => {
          return payload.cohortAnswerDeactivated.cohortQuestionId === variables.cohortQuestionId;
        }
      )
    }
  },

  CohortAnswer: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    },
    cohortQuestion: async (parent, _, { loaders }) => {
      return await loaders.cohortQuestion.load(parent.cohortQuestionId);
    }
  }
}