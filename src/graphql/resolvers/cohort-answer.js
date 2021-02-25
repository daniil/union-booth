import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
  Mutation: {
    addCohortAnswer: combineResolvers(
      isAuthenticated,
      async (_, { cohortQuestionId, answer }, { models, session }) => {
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

        const topic = await models.CohortTopic.findOne({
          where: {
            topicId: question.topicId,
            isLive: true
          }
        });

        if (!topic) {
          throw new UserInputError('This topic is not live. Can only add questions to live topics');
        }

        try {
          const newAnswer = await models.CohortAnswer.create({
            userId: session.user.id,
            cohortQuestionId,
            answer
          });

          return newAnswer;
        } catch(err) {
          console.log('ERR? ', err)
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  },

  CohortAnswer: {
    user: async (parent, _, { loaders }) => {
      return await loaders.user.load(parent.userId);
    }
  }
}