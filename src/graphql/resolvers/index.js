import { GraphQLDateTime } from 'graphql-iso-date';

import programResolver from './program';
import cohortResolver from './cohort';
import topicResolvers from './topic';
import cohortTopicResolvers from './cohort-topic';
import cohortQuestionResolvers from './cohort-question';
import cohortQuestionUpvoteResolvers from './cohort-question-upvote';
import cohortAnswerResolvers from './cohort-answer';
import cohortAnswerInProgressResolvers from './cohort-answer-in-progress';
import cohortAnswerUpvoteResolvers from './cohort-answer-upvote';
import topicFAQResolvers from './topic-faq';
import topicFAQQuestionResolvers from './topic-faq-question';
import topicResourcesResolvers from './topic-resources';
import resourceResolvers from './resource';
import userResolvers from './user';
import appMeta from './app-meta';

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
  cohortQuestionUpvoteResolvers,
  cohortAnswerResolvers,
  cohortAnswerInProgressResolvers,
  cohortAnswerUpvoteResolvers,
  topicFAQResolvers,
  topicFAQQuestionResolvers,
  topicResourcesResolvers,
  resourceResolvers,
  userResolvers,
  appMeta
];
