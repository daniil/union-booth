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

const TOGGLE_COHORT_TOPIC_STATUS = gql`
  mutation ToggleCohortTopicStatus($cohortId: ID!, $topicId: ID!, $statusType: String!, $status: Boolean!) {
    toggleCohortTopicStatus(cohortId: $cohortId, topicId: $topicId, statusType: $statusType, status: $status) {
      ...CohortTopicInformation
    }
  }
  ${cohortTopicInformation}
`;

export {
  COHORT_TOPICS,
  TOGGLE_COHORT_TOPIC_STATUS
}