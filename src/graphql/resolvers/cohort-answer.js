import { PubSub, withFilter, UserInputError } from 'apollo-server';
import { pipeResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

const pubsub = new PubSub();

const validateAndReturnTopicIdOfCohortQuestion = async (_, { cohortQuestionId }, { models, session }) => {
  const user = await models.User.findOne({
    attributes: ['cohortId'],
    where: {
      id: session.user.id
    }
  });

  const question = await models.CohortQuestion.findOne({
    attributes: ['topicId'],
    where: {
      id: cohortQuestionId,
      cohortId: user.cohortId
    }
  });

  if (!question) {
    throw new UserInputError('This question does not exist in your cohort. Can only answer questions from your own cohort');
  }

  return question.dataValues;
};

const validateTopicLive = async ({ topicId }, {  }, { models }) => {
  const topic = await models.CohortTopic.findOne({
    where: {
      topicId,
      isLive: true
    }
  });

  if (!topic) {
    throw new UserInputError('This topic is not live. Can only add answers to live topics');
  }
};

export default {
  Query: {
    liveAnswers: pipeResolvers(
      isAuthenticated,
      validateAndReturnTopicIdOfCohortQuestion,
      validateTopicLive,
      async (_, { cohortQuestionId }, { models }) => {
        const answers = models.CohortAnswer.findAll({
          where: {
            cohortQuestionId
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
      async (_, { cohortQuestionId, answer }, { models, session }) => {
        try {
          const newAnswer = await models.CohortAnswer.create({
            userId: session.user.id,
            cohortQuestionId,
            answer
          });

          pubsub.publish('NEW_COHORT_ANSWER', { newCohortAnswer: newAnswer });

          return newAnswer;
        } catch(err) {
          console.log('ERR? ', err)
          throw new UserInputError(parseSequelizeError(err));
        }
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