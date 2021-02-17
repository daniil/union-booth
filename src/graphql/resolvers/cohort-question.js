import { UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';
import parseSequelizeError from 'utils/parseSequelizeError';

export default {
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

        try {
          const newQuestion = await models.CohortQuestion.create({
            userId: session.user.id,
            cohortId: user.cohortId,
            topicId,
            question,
            isAnonymous
          });

          return newQuestion;
        } catch(err) {
          throw new UserInputError(parseSequelizeError(err));
        }
      }
    )
  }
}