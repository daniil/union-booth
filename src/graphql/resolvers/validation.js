import { UserInputError, ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

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

  return skip;
};

export const validateTopicSlug = async (_, { slug }, { models, session }) => {
  const topic = await models.Topic.findOne({
    attributes: ['programId'],
    where: {
      slug
    }
  });

  if (!topic) {
    throw new UserInputError('This topic does not exist');
  }

  const user = await models.User.findOne({
    attributes: ['id'],
    where: {
      id: session.user.id,
      selectedProgram: topic.programId,
      isInactive: false
    }
  });

  return user ? skip : new ForbiddenError('You do not have access to this topic');
};

export const validateManagerCohort = async (_, { cohortId }, { models, session }) => {
  const manager = await models.User.findOne({
    attributes: ['selectedProgram'],
    where: {
      id: session.user.id,
      isInactive: false
    }
  });

  const cohort = await models.Cohort.findOne({
    attributes: ['id'],
    where: {
      id: cohortId,
      programId: manager.selectedProgram
    }
  });

  return cohort ? skip : new UserInputError('You can not get users from cohort that is not part of your program.');
}