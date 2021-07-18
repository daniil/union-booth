import gql from 'graphql-tag';

const COHORT_USERS = gql`
  query CohortUsers($cohortId: ID!) {
    cohortUsers(cohortId: $cohortId) {
      id
      firstName
      lastName
      username
      email
      createdAt
    }
  }
`;

export {
  COHORT_USERS
}