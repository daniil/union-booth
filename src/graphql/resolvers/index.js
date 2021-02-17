import { GraphQLDateTime } from 'graphql-iso-date';

import programResolver from './program';
import cohortResolver from './cohort';
import topicResolvers from './topic';
import cohortTopicResolvers from './cohort-topic';
import cohortQuestionResolvers from './cohort-question';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  programResolver,
  cohortResolver,
  topicResolvers,
  cohortTopicResolvers,
  cohortQuestionResolvers,
  userResolvers
];
