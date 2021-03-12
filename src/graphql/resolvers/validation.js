import { UserInputError } from 'apollo-server';

export const validateAndReturnTopicIdOfCohortQuestion = async (_, { cohortQuestionId }, { models, session }) => {
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

  return {
    cohortId: user.cohortId,
    topicId: question.topicId
  }
};

export const validateTopicLive = async ({ cohortId, topicId }, {  }, { models }) => {
  const topic = await models.CohortTopic.findOne({
    where: {
      cohortId,
      topicId,
      isLive: true
    }
  });

  if (!topic) {
    throw new UserInputError('This topic is not live. Can only add answers to live topics');
  }
};