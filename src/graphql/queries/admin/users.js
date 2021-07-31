import gql from 'graphql-tag';

const userInformation = gql`
  fragment UserInformation on User {
    id
    firstName
    lastName
    username
    email
    role
    cohortId
    createdAt
    isInactive
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

const PROGRAM_USERS = gql`
  query ProgramUsers {
    programUsers {
      ...UserInformation
    }
  } 
  ${userInformation}
`;

const UPDATE_USER_ACTIVE_STATUS = gql`
  mutation UpdateUserActiveStatus($id: ID!, $isInactive: Boolean!) {
    updateUserActiveStatus(id: $id, isInactive: $isInactive) {
      ...UserInformation
    }
  }
  ${userInformation}
`;

export {
  COHORT_USERS,
  COHORT_TEAM_USERS,
  PROGRAM_USERS,
  UPDATE_USER_ACTIVE_STATUS
}