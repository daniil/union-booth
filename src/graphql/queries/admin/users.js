import gql from 'graphql-tag';

const userInformation = gql`
  fragment UserInformation on User {
    id
    firstName
    lastName
    username
    email
    createdAt
  }
`;

const COHORT_USERS = gql`
  query CohortUsers($cohortId: ID!) {
    cohortUsers(cohortId: $cohortId) {
      ...UserInformation
    }
  }
  ${userInformation}
`;

const COHORT_TEAM_USERS = gql`
  query CohortTeamUsers($cohortId: ID!) {
    cohortTeamUsers(cohortId: $cohortId) {
      ...UserInformation
    }
  }
  ${userInformation}
`;

export {
  COHORT_USERS,
  COHORT_TEAM_USERS
}