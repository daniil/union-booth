import ApolloClient from 'apollo-client';
import { makeExecutableSchema } from 'apollo-server';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { loadersContext } from './server';
import models from './models';
import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const initSSRClient = session => {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({
      schema,
      context: {
        models,
        loaders: loadersContext,
        session
      }
    }),
    cache: new InMemoryCache()
  });
} 