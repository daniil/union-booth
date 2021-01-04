import { GraphQLDateTime } from 'graphql-iso-date';

import topicResolvers from './topic';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  topicResolvers
];
