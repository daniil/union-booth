import http from 'http';
import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import loaders from './loaders';

const loadersContext = {
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
			  origin: ['http://localhost:3000'],
			  credentials: true
      }
    });

    const httpServer = http.createServer(app.handler);
    graphQLServer.installSubscriptionHandlers(httpServer);

    return httpServer;
  }
}
