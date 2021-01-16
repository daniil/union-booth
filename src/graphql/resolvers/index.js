import { GraphQLDateTime } from 'graphql-iso-date';

import programResolver from './program';
import topicResolvers from './topic';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  programResolver,
  topicResolvers,
  userResolvers
];
