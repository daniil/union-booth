import { GraphQLDateTime } from 'graphql-iso-date';

import programResolver from './program';
import cohortResolver from './cohort';
import topicResolvers from './topic';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  programResolver,
  cohortResolver,
  topicResolvers,
  userResolvers
];
