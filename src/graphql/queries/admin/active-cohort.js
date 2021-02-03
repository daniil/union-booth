import gql from 'graphql-tag';

const COHORT_TOPICS = gql`
  query CohortTopics($cohortId: ID!) {
    cohortTopics(cohortId: $cohortId) {
      topic {
        id
        title
      }
      isLive
      isUnlocked
    }
  }
`;

export {
  COHORT_TOPICS
}