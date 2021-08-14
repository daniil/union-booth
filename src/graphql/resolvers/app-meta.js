import gitVersion from 'git-tag-version';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './auth';

export default {
  Query: {
    appVersion: combineResolvers(
      isAuthenticated,
      async () => {
        return gitVersion();
      }
    )
  }
};