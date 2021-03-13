import http from 'http';
import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import loaders from './loaders';

const { NODE_ENV, SERVER_URL, PORT } = process.env;

const prod = NODE_ENV === 'production';
const httpProtocol = prod ? 'https' : 'http';

export const loadersContext = {
	user: new DataLoader(keys => loaders.user.batchUsers(keys, models)),
  program: new DataLoader(keys => loaders.program.batchPrograms(keys, models)),
  cohort: new DataLoader(keys => loaders.cohort.batchCohorts(keys, models)),
  topic: new DataLoader(keys => loaders.topic.batchTopics(keys, models)),
  cohortQuestion: new DataLoader(keys => loaders.cohortQuestion.batchCohortQuestions(keys, models))
};

export default {
  init: app => {
    const graphQLServer = new ApolloServer({
      introspection: !prod,
      playground: !prod,
      typeDefs,
      resolvers,
      context: async ({ req, connection }) => {
        if (connection) {
          return {
            models,
            loaders: loadersContext
          };
        }

        if (req) {
          return {
            models,
            loaders: loadersContext,
            session: req.session
          };
        }
      }
    });

    graphQLServer.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
			  origin: [`${httpProtocol}://${SERVER_URL}:${PORT}`],
			  credentials: true
      }
    });

    const httpServer = http.createServer(app.handler);
    graphQLServer.installSubscriptionHandlers(httpServer);

    return httpServer;
  }
}
