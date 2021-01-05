import http from 'http';
import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const loaders = {
	user: new DataLoader(keys =>
		loaders.user.batchUsers(keys, models),
	)
};

export default {
  init: app => {
    const graphQLServer = new ApolloServer({
      introspection: true,
      playground: true,
      typeDefs,
      resolvers,
      context: async ({ req, connection }) => {
        if (connection) {
          return {
            models,
            loaders
          };
        }

        if (req) {
          return {
            models,
            loaders
          };
        }
      }
    });

    graphQLServer.applyMiddleware({ app, path: '/graphql' });

    const httpServer = http.createServer(app.handler);
    graphQLServer.installSubscriptionHandlers(httpServer);

    return httpServer;
  }
}
