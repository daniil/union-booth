import { GraphQLDateTime } from 'graphql-iso-date';

import topicResolvers from './topic';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  topicResolvers,
  userResolvers
];
