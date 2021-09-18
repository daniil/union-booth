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
    isVerified
    isInactive
  }
`;

const UNVERIFIED_USERS = gql`
  query UnverifiedUsers($cohortId: ID!) {
    unverifiedUsers(cohortId: $cohortId) {
      ...UserInformation
    }
  }
  ${userInformation}
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

const VERIFY_USER = gql`
  mutation VerifyUser($id: ID!) {
    verifyUser(id: $id) {
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

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: ID!, $newRole: String!) {
    updateUserRole(id: $id, newRole: $newRole) {
      ...UserInformation
    }
  }
  ${userInformation}
`;

export {
  UNVERIFIED_USERS,
  COHORT_USERS,
  COHORT_TEAM_USERS,
  PROGRAM_USERS,
  VERIFY_USER,
  UPDATE_USER_ACTIVE_STATUS,
  UPDATE_USER_ROLE
}