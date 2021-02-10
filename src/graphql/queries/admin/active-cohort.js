import gql from 'graphql-tag';

const cohortTopicInformation = gql`
  fragment CohortTopicInformation on CohortTopic {
    topic {
      id
      title
    }
    isLive
    isUnlocked
  }
`;

const COHORT_TOPICS = gql`
  query CohortTopics($cohortId: ID!) {
    cohortTopics(cohortId: $cohortId) {
      ...CohortTopicInformation
    }
  }
  ${cohortTopicInformation}
`;

const TOGGLE_COHORT_TOPIC_UNLOCKED = gql`
  mutation toggleCohortTopicUnlocked($cohortId: ID!, $topicId: ID!, $status: Boolean!) {
    toggleCohortTopicUnlocked(cohortId: $cohortId, topicId: $topicId, status: $status) {
      ...CohortTopicInformation
    }
  }
  ${cohortTopicInformation}
`;

export {
  COHORT_TOPICS,
  TOGGLE_COHORT_TOPIC_UNLOCKED
}